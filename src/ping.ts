import * as ink from "https://deno.land/x/ink@1.3/mod.ts";

export async function ping(url: string) {
  const t0 = performance.now();
  const rawResponse = await fetch(url, { method: "GET" });
  const _: string = await rawResponse.text();
  const t1 = performance.now();
  console.log(ink.colorize(`<green>ping: ${t1 - t0}ms</green>`));
}

