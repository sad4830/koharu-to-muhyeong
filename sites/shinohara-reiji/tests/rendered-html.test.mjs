import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();

  assert.match(html, developmentPreviewMeta);
  assert.match(html, /단단한 물체 두 곳을 빛나는 선으로 잇고/);
  assert.match(html, /발사에 쓴 선은 즉시 사라지고/);
  assert.match(html, /견인이 끝나면 사용한 선은 사라진다/);
  assert.match(html, /반격에 쓴 선은 즉시 사라진다/);
  assert.match(html, /이동에 쓴 선은 착지와 함께 사라진다/);
  assert.match(html, /사용한 세 가닥이 모두 사라지고/);
  assert.match(html, /충전하는 2지문 동안 자리에서 움직이거나/);
});
