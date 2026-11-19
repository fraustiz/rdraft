/**
 * Visitor counting, with Umami (self-hosted).
 *
 * Why it exists: to know whether anyone uses the randomizer, and how many
 * people a day. Nothing finer than that.
 *
 * Why it needs no consent banner: Umami sets no cookie and stores nothing on
 * the visitor's device (the language and volume kept in localStorage are the
 * app's own settings, unrelated to this).
 *
 * Shared by next.config.ts (the rewrites) and the <Script> in app/layout.tsx,
 * so the path the browser asks for and the path the server forwards cannot
 * drift apart.
 */

/** Where Umami actually runs. Never contacted by the browser: the tracker is
 * loaded and posts through STATS_PATH on this app's own origin, so blockers
 * of third-party analytics domains have nothing to match. */
export const UMAMI_ORIGIN = "https://umami.jules-drevon.fr";

/** Same-origin prefix the rewrites forward to UMAMI_ORIGIN. */
export const STATS_PATH = "/stats";

/** Not a secret: it is printed in every page anyway, like any tracker id. */
export const UMAMI_WEBSITE_ID = "39fc244d-ccbe-45f5-8d59-dcc32bd889c5";

/** Only the canonical host is counted, so `next dev` and previews add nothing. */
export const COUNTED_DOMAIN = "rdraft.frohub.eu";
