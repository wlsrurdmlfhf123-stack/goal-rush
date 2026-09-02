// 플레이테스트 하네스 (임시). 브라우저 탭이 숨겨지면 rAF도 Worker 타이머도
// Chrome의 intensive throttling에 걸려 2~9Hz까지 떨어진다. 그래서 rAF를 직접
// 펌프하고 performance.now를 가상 시계로 바꿔 실제 코드 경로를 정확히 1/60
// dt로, 스로틀과 무관하게 3배속으로 돌린다.
(function () {
  if (!window.__pump) {
    var realNow = performance.now.bind(performance);
    var vt = realNow();
    window.__realNow = realNow;
    performance.now = function () { return vt; };
    var q = [], nid = 1;
    window.requestAnimationFrame = function (fn) { q.push(fn); return nid++; };
    window.cancelAnimationFrame = function () {};
    window.__pump = function (n) {
      var S = 1000 / 60;
      for (var i = 0; i < n; i++) {
        vt += S;
        var l = q; q = [];
        for (var j = 0; j < l.length; j++) { try { l[j](vt); } catch (e) { console.error(e); } }
      }
      return n;
    };
    window.__k = function (c, down) {
      var e = new KeyboardEvent(down ? "keydown" : "keyup", { code: c, key: c, bubbles: true });
      window.dispatchEvent(e); document.dispatchEvent(e);
    };
  }

  var d = window.__dbg;
  window.__resetT = function () {
    window.__T = { f: 0, bestZ: 999, knock: 0, knockZ: [], lost: 0, stall: 0, stallZ: [], ended: null };
  };

  /** 목표 지점까지 걸어간다 (벽 우회용) */
  window.__goto = function (tx, tz, maxF) {
    var held = false;
    for (var i = 0; i < maxF; i++) {
      var p = d.players()[0].pelvis, dx = tx - p[0], dz = tz - p[2];
      if (Math.hypot(dx, dz) < 0.9) { if (held) window.__k("KeyW", false); return 1; }
      d.yaw = Math.atan2(dx, dz);
      if (!held) { window.__k("KeyW", true); held = true; }
      window.__pump(1);
    }
    if (held) window.__k("KeyW", false);
    return 0;
  };

  /**
   * 자동 플레이어. 공이 멀면 공을 주우러 가고, 가까우면 골대 쪽으로 몬다.
   * 진행이 2.5초 멈추면 킥 -> 개인기 -> 스톱턴 -> 좌우 우회를 돌아가며 시도한다.
   */
  window.__auto = function (frames) {
    var T = window.__T, goal = d.world.map.goal;
    var held = false, last = "ACTIVE", sf = 0, rc = 0;
    function W(on) { if (held === on) return; held = on; window.__k("KeyW", on); }
    for (var i = 0; i < frames; i++) {
      var ps = d.players(); if (!ps.length) break;
      var me = ps.find(function (x) { return x.id === 0; }) || ps[0];
      var p = me.pelvis, bl = d.ball(); if (!bl) break;
      var b = bl.p;
      if (me.state !== "ACTIVE" && last === "ACTIVE") { T.knock++; T.knockZ.push(+p[2].toFixed(1)); }
      last = me.state;
      var dB = Math.hypot(b[0] - p[0], b[2] - p[2]);
      if (dB > 6 && T.f % 60 === 0) T.lost++;
      var tx, tz;
      if (dB > 2.2) { tx = b[0]; tz = b[2]; } else { tx = goal.x; tz = goal.z; }

      // [문틀 통과] 게이트/미는 문은 좌우가 문틀로 막혀 있고 가운데만 뚫려
      // 있다. 사람은 문이 보이니까 알아서 가운데로 들어가지만, 이 봇은 목표를
      // 향해 직진할 뿐이라 문틀에 처박혀 그대로 멈춘다.
      //
      // 실측으로 두 가지가 따로 필요했다.
      //  1. 사람이 통로 정면으로 가야 한다  (s1: x=-5 로 붙어 z=-61.6 에 30초 정체)
      //  2. **공을 통로 쪽으로 몰아야 한다**  (s2: 공이 x=-5.5 에서 문틀에 붙고
      //     봇이 그 공을 벽으로 계속 밀어 z=-17 에 60초 정체)
      // 2를 풀려면 공 뒤(문 반대편)로 돌아가서 밀어야 한다 — 축구봇이 늘 하는
      // 그 동작인데 이 하네스에는 없었다.
      var doors = [];
      try {
        var cp = d.coop();
        for (var gi = 0; gi < cp.gates.length; gi++) doors.push(cp.gates[gi]);
        for (var pi = 0; pi < cp.push.length; pi++) doors.push(cp.push[pi]);
      } catch (e) { /* coop() 이 없는 옛 빌드면 그냥 건너뛴다 */ }
      for (var di = 0; di < doors.length; di++) {
        var dr = doors[di];
        if (!dr.half) continue;
        var lane = dr.half - 0.6;                       // 몸 폭 여유

        // (a) **공이 문 바로 앞에서 통로 밖에 붙어 있다** = 벽에 밀어붙이는 중이다.
        //     공 뒤(문 반대편)로 돌아가 통로 쪽으로 민다.
        //     공을 버리고 가지 않도록 **내가 공 근처일 때만** 한다.
        var nearDoorBall = Math.abs(b[2] - dr.z) < 6 && Math.abs(b[0] - dr.x) > lane;
        if (nearDoorBall && dB < 4.5) {
          var mouthZ = b[2] > dr.z ? dr.z + 2.5 : dr.z - 2.5;
          var ux = b[0] - dr.x, uz = b[2] - mouthZ;
          var ul = Math.hypot(ux, uz) || 1;
          var standX = b[0] + (ux / ul) * 1.5, standZ = b[2] + (uz / ul) * 1.5;
          if (Math.hypot(p[0] - standX, p[2] - standZ) > 1.0) { tx = standX; tz = standZ; }
          else { tx = dr.x; tz = mouthZ; }              // 자리를 잡았으면 밀어 넣는다
          break;
        }

        // (b) 문이 **나와 목표 사이**에 있으면 통로 정면으로 x 를 맞춘다
        var betweenD = (p[2] > dr.z && tz < dr.z) || (p[2] < dr.z && tz > dr.z);
        if (!betweenD) continue;
        if (Math.abs(p[0] - dr.x) <= lane) break;       // 이미 통로 정면이다
        tx = dr.x;
        tz = p[2] > dr.z ? Math.max(tz, dr.z + 3) : Math.min(tz, dr.z - 3);
        break;
      }

      // [공 전용 틈 우회] 사람은 틈을 통과할 수 없다. 나와 목표 사이에
      // 틈이 끼어 있으면 곧장 가지 말고 옆길(x=±6.2)로 돌아간다.
      // 이걸 모르면 벽에 계속 처박혀서 레벨이 막힌 것처럼 보인다 -
      // 사람은 초록 옆길을 보고 알아서 도는 부분이다.
      var slots = d.world.map.ballSlots || [];
      for (var si = 0; si < slots.length; si++) {
        var sz = slots[si];
        // 틈이 나와 목표 사이에 끼어 있으면 (앞뒤 어느 방향이든) 옆으로 돈다.
        // 벽은 양쪽에서 다 막으므로 되돌아갈 때도 똑같이 우회해야 한다.
        var between = (p[2] > sz && tz < sz) || (p[2] < sz && tz > sz);
        if (!between) continue;
        var side = p[0] >= 0 ? 6.2 : -6.2;
        var beyond = p[2] > sz ? sz - 3.5 : sz + 3.5;   // 반대편으로 빠져나갈 z
        if (Math.abs(p[0]) < 5.4) { tx = side; tz = p[2]; }        // 먼저 옆으로
        else { tx = side; tz = beyond; }                            // 옆길로 통과
        break;
      }

      d.yaw = Math.atan2(tx - p[0], tz - p[2]); W(true);
      if (p[2] < T.bestZ - 0.05) { T.bestZ = p[2]; sf = 0; } else sf++;
      if (sf > 150) {
        T.stall++; T.stallZ.push(+p[2].toFixed(1)); sf = 0;
        var r = (rc++) % 5; W(false);
        if (r === 0) d.pressKick();
        else if (r === 1) d.pressTrick();
        else if (r === 2) { window.__k("KeyQ", true); window.__k("KeyQ", false); }
        else {
          var s = (r === 3 ? 6.2 : -6.2);
          window.__goto(s, p[2] + 2, 260);
          window.__goto(s, p[2] - 5, 340);
          window.__goto(0, p[2] - 6.5, 300);
          T.bestZ = Math.min(T.bestZ, d.players()[0].pelvis[2]);
        }
        // __goto가 자기 쪽에서 W를 떼고 나가므로 held를 강제로 풀어준다.
        // 안 그러면 __auto는 여전히 눌려 있다고 믿어 다시 누르지 않고, 그
        // 뒤로 영영 전진 입력이 안 나간다 (첫 실행이 통째로 멈췄던 원인).
        held = false;
        T.f++;
      }
      window.__pump(1); T.f++;
      if (d.phase() !== "playing") { T.ended = d.phase(); break; }
    }
    W(false);
    return { f: T.f, bestZ: +T.bestZ.toFixed(1), phase: d.phase() };
  };

  /**
   * 카운트다운이 끝날 때까지 기다린다 (그 동안은 이동 입력이 무시된다).
   *
   * [먼저 무조건 펌프한다] startCountdown()은 countdown 값만 세우고,
   * #countdown의 hidden은 다음 animate 프레임의 updateCountdown이 푼다.
   * 그래서 클릭 직후에 hidden을 보면 아직 true라 "이미 끝났다"로 오판하고
   * 곧바로 빠져나간다 - 자동 플레이가 통째로 카운트다운 안에서 돌아
   * 출발선에서 한 발짝도 못 나가는 원인이었다. 3.2초(192프레임)보다 넉넉히
   * 돌린 뒤에 hidden을 보기 시작한다.
   */
  window.__ready = function () {
    var el = document.getElementById("countdown");
    window.__pump(240);
    for (var i = 0; i < 600 && el && !el.hidden; i++) window.__pump(1);
    return d.phase();
  };

  /** 한 스테이지를 처음부터 돌리고 요약을 돌려준다 */
  window.__stage = function (frames) {
    window.__ready();
    window.__resetT();
    var r = window.__auto(frames), T = window.__T;
    return {
      map: d.world.map.name, 결과: r.phase,
      게임초: +(T.f / 60).toFixed(1), 제한: d.world.map.timeLimit,
      bestZ: r.bestZ, goalZ: d.world.map.goal.z,
      knock: T.knock, stall: T.stall, stallZ: T.stallZ.slice(-6), lost: T.lost,
    };
  };

  /**
   * 타이틀 -> 싱글 플레이 진입.
   *
   * 진입 직후 restart를 한 번 거친다. 맵 로드와 카운트다운 시작 타이밍이
   * 클릭 핸들러 쪽에 있어서, 곧바로 __ready를 부르면 아직 시작도 안 한
   * 카운트다운을 "이미 끝났다"고 보고 지나가 버린다. 그러면 자동 플레이가
   * 통째로 카운트다운 안에서 돌아 출발선에서 한 발짝도 못 나간다.
   * restart는 resetWorld -> startCountdown을 확실히 태워서 상태를 맞춰준다.
   */
  window.__start = function () {
    document.getElementById("btn-single").click(); window.__pump(10);
    document.getElementById("btn-pick-ok").click(); window.__pump(150);
    const rb = document.getElementById("retry");
    if (rb) { rb.click(); window.__pump(30); }
    window.__ready();
    return d.phase();
  };
  /** 다음 맵으로 */
  window.__next = function () {
    document.getElementById("next-map").click(); window.__pump(180);
    window.__ready();
    return d.world.map.name;
  };
  return "ready";
})();
