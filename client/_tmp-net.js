// 2인 네트워크 검증 하네스 (임시).
//
// 숨겨진 탭은 Chrome intensive throttling에 걸려 rAF도 Worker 타이머도 2~9Hz로
// 떨어진다. 그래서 rAF를 직접 펌프하고 performance.now를 가상 시계로 바꿔
// 실제 코드 경로를 정확히 1/60 dt로 돌린다 (_tmp-auto.js와 같은 방식).
//
// [멀티에서 추가로 필요한 것] 펌프 루프는 동기라서, 그 안에서는 WebSocket
// 메시지가 하나도 배달되지 않는다(메인 스레드를 붙잡고 있으므로). 그래서
// 한 덩어리 펌프한 뒤 반드시 이벤트 루프에 양보해야 상대의 스냅샷/입력이
// 들어온다. setTimeout은 숨겨진 탭에서 1초 이상으로 throttle되므로 쓰지 않고
// MessageChannel 매크로태스크로 양보한다 (throttle 대상이 아니다).
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

  /** 이벤트 루프에 한 번 양보한다 (여기서 WS 메시지가 배달된다) */
  window.__yield = function () {
    return new Promise(function (res) {
      var ch = new MessageChannel();
      ch.port1.onmessage = function () { ch.port1.close(); res(); };
      ch.port2.postMessage(0);
    });
  };

  /** n프레임 펌프하고 양보한다. 네트워크가 도는 최소 단위. */
  window.__step = async function (n, rounds) {
    rounds = rounds || 1;
    for (var i = 0; i < rounds; i++) { window.__pump(n); await window.__yield(); }
    return true;
  };

  var d = window.__dbg;

  /** 카운트다운이 끝날 때까지 (그 전에는 이동 입력이 무시된다) */
  window.__ready = async function () {
    var el = document.getElementById("countdown");
    for (var i = 0; i < 40 && el && !el.hidden; i++) await window.__step(20);
    return d.phase();
  };

  /** 멀티 - 방 만들기. 방 코드를 돌려준다 (대기실에 뜬 뒤) */
  window.__host = async function () {
    document.getElementById("btn-multi").click(); await window.__step(6);
    document.getElementById("btn-pick-ok").click(); await window.__step(6);
    document.getElementById("btn-create-room").click();
    for (var i = 0; i < 40; i++) {
      await window.__step(6);
      var c = document.getElementById("lobby-code").textContent.trim();
      if (c && c !== "----") return c;
    }
    return null;
  };

  /** 멀티 - 방 참가 */
  window.__join = async function (code) {
    document.getElementById("btn-multi").click(); await window.__step(6);
    document.getElementById("btn-pick-ok").click(); await window.__step(6);
    document.getElementById("btn-join-room").click(); await window.__step(6);
    var inp = document.getElementById("join-code");
    inp.value = code;
    inp.dispatchEvent(new Event("input", { bubbles: true }));
    document.getElementById("btn-join-go").click();
    for (var i = 0; i < 40; i++) {
      await window.__step(6);
      var err = document.getElementById("join-error").textContent.trim();
      if (err) return { ok: false, error: err };
      var list = document.getElementById("lobby-players").textContent.trim();
      if (list) return { ok: true, lobby: list };
    }
    return { ok: false, error: "timeout" };
  };

  /** host: 게임 시작 */
  window.__startGame = async function () {
    document.getElementById("btn-start-game").click();
    await window.__step(20, 6);
    return d.phase();
  };

  /** 지금 이 클라이언트가 보는 상태 요약 (양쪽을 비교하는 데 쓴다) */
  window.__snap = function () {
    var b = d.ball();
    return {
      id: d.net.id,
      auth: d.authority(),
      phase: d.phase(),
      map: d.world.map.name,
      players: d.players().map(function (p) {
        return { id: p.id, x: +p.pelvis[0].toFixed(2), y: +p.pelvis[1].toFixed(2), z: +p.pelvis[2].toFixed(2), st: p.state };
      }),
      ball: b ? { x: +b.p[0].toFixed(2), y: +b.p[1].toFixed(2), z: +b.p[2].toFixed(2), held: b.heldBy } : null,
    };
  };

  /** 장애물(문 포함) 높이 - 양쪽 클라이언트에서 같아야 한다 */
  window.__gates = function () {
    var out = {};
    d.world.obstacleSpecs.forEach(function (s) {
      if (s.kind !== "buttongate" && s.kind !== "coopgate") return;
      var o = d.objects().filter(function (x) { return x.id === s.id; })[0];
      if (o) out[s.kind + "@" + s.z] = +o.p[1].toFixed(2);
    });
    return out;
  };

  /** 래그돌 전체를 통째로 옮긴다 (골반만 옮기면 관절이 늘어난다). host에서만 의미 있다 */
  window.__place = function (playerId, tx, tz) {
    var L = (d.physics.bodies || d.physics.world.bodies);
    var me = d.players().filter(function (p) { return p.id === playerId; })[0];
    if (!me) return null;
    var pp = me.pelvis, dx = tx - pp[0], dz = tz - pp[2], n = 0;
    L.forEach(function (b) {
      if (b.mass <= 0) return;
      if (Math.hypot(b.position.x - pp[0], b.position.z - pp[2]) > 1.4) return;
      if (b.shapes[0] && b.shapes[0].radius === 0.3) return;   // 공 제외
      b.position.x += dx; b.position.z += dz;
      b.previousPosition.copy(b.position); b.interpolatedPosition.copy(b.position);
      b.velocity.setZero(); b.angularVelocity.setZero(); b.wakeUp(); n++;
    });
    return n;
  };

  /** 공을 원하는 자리에 놓는다 (host 전용) */
  window.__setBall = function (x, z) {
    var L = (d.physics.bodies || d.physics.world.bodies);
    var b = L.find(function (o) {
      var s = o.shapes[0];
      return s && s.radius && Math.abs(s.radius - 0.3) < 0.02 && o.mass > 0;
    });
    if (!b) return null;
    b.position.set(x, 0.35, z); b.velocity.setZero(); b.angularVelocity.setZero();
    b.previousPosition.copy(b.position); b.interpolatedPosition.copy(b.position); b.wakeUp();
    return [x, z];
  };

  return "net harness ready";
})();
