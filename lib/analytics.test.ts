import { describe, expect, it } from "vitest";
import config from "../next.config";
import { STATS_PATH, UMAMI_ORIGIN } from "./analytics";

// The rewrites make this origin a proxy to the Umami host. A careless
// `${STATS_PATH}/:path*` would expose the whole Umami API and its login page
// under rdraft.frohub.eu; these pin it to the two paths the tracker needs.
describe("the analytics rewrites", () => {
  it("forward only the tracker script and the collection endpoint", async () => {
    const all = await config.rewrites!();
    const list = Array.isArray(all)
      ? all
      : [...(all.beforeFiles ?? []), ...(all.afterFiles ?? []), ...(all.fallback ?? [])];
    const rewrites = list.filter(
      (r) => r.destination.startsWith(UMAMI_ORIGIN) || r.source.startsWith(STATS_PATH),
    );
    expect(rewrites).toEqual([
      { source: `${STATS_PATH}/script.js`, destination: `${UMAMI_ORIGIN}/script.js` },
      { source: `${STATS_PATH}/api/send`, destination: `${UMAMI_ORIGIN}/api/send` },
    ]);
  });
});
