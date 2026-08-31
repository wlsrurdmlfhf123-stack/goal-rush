/**
 * cloudflared quick tunnel 을 **직접 spawn** 한다.
 *
 * untun 의 programmatic API 는 cloudflared 자식을 감시하는 내부 프라미스가
 * 상황에 따라 unhandledRejection 을 던져 부모 프로세스를 죽인다. 여기서는
 * 바이너리만 (필요하면 untun 으로 1회 받아서) 직접 실행하고 stdout/stderr 에서
 * `https://xxxx.trycloudflare.com` 을 파싱한다. 종료도 우리가 통제한다.
 *
 * [연결 안정성] quick tunnel 은 기본이 QUIC(UDP)인데 일부 망/방화벽에서
 * UDP 가 막히거나 불안정해 접속 중 Error 1033(터널 다운)이 뜬다. 그래서
 * `--protocol http2`(TCP) 로 강제한다. `CF_PROTOCOL` 로 바꿀 수 있다.
 * 연결이 살아있는지 로그도 그대로 흘려보낸다([cloudflared] 접두).
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const VERSION = process.env.CLOUDFLARED_VERSION || "2026.7.2";
const BIN = path.join(
  tmpdir(), "node-untun",
  process.platform === "win32" ? `cloudflared.${VERSION}.exe` : `cloudflared.${VERSION}`,
);
const PROTOCOL = process.env.CF_PROTOCOL || "http2";

/** 바이너리가 없으면 untun 으로 1회 받는다 (untun 은 첫 startTunnel 때 다운로드) */
async function ensureBinary() {
  if (existsSync(BIN)) return;
  const { startTunnel } = await import("untun");
  const t = await startTunnel({ url: "http://localhost:1", acceptCloudflareNotice: true }).catch(() => null);
  try { await t?.close(); } catch { /* */ }
  if (!existsSync(BIN)) throw new Error(`cloudflared 바이너리를 받지 못했다: ${BIN}`);
}

/**
 * @param {number} port  로컬 포트
 * @returns {Promise<{ url: string, stop: () => void, proc: import("node:child_process").ChildProcess }>}
 */
export async function startQuickTunnel(port) {
  await ensureBinary();
  const proc = spawn(BIN, [
    "tunnel", "--no-autoupdate",
    "--protocol", PROTOCOL,
    "--url", `http://localhost:${port}`,
  ], { stdio: ["ignore", "pipe", "pipe"] });

  let url = null;
  let connected = false;
  const onLine = (buf) => {
    for (const line of String(buf).split("\n")) {
      if (!line.trim()) continue;
      const m = line.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/i);
      if (m && !url) url = m[0];
      if (/Registered tunnel connection|Connection .* registered/i.test(line)) connected = true;
      // 연결/에러 관련 줄만 골라 보여준다 (노이즈 억제)
      if (/tunnel connection|error|ERR|failed|unregister|retry|Lost connection|edge/i.test(line)) {
        console.log(`  [cloudflared] ${line.trim()}`);
      }
    }
  };
  proc.stdout.on("data", onLine);
  proc.stderr.on("data", onLine);

  const deadline = Date.now() + 45_000;
  while ((!url || !connected) && Date.now() < deadline && proc.exitCode === null) {
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!url) {
    try { proc.kill(); } catch { /* */ }
    throw new Error("cloudflared URL 을 45초 안에 못 받았다. 네트워크를 확인해라.");
  }

  const stop = () => { try { proc.kill(); } catch { /* */ } };
  return { url, stop, proc };
}
