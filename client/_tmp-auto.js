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
