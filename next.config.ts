import type { NextConfig } from "next";
import { STATS_PATH, UMAMI_ORIGIN } from "./lib/analytics";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ddragon.leagueoflegends.com", pathname: "/cdn/**" },
    ],
  },

  /**
   * Umami's tracker and its collection endpoint, served from this origin.
   * See lib/analytics.ts for why it goes through here rather than straight
   * to the Umami host. Only these two paths are forwarded: the Umami
   * dashboard and the rest of its API stay on their own host.
   */
  async rewrites() {
    return [
      { source: `${STATS_PATH}/script.js`, destination: `${UMAMI_ORIGIN}/script.js` },
      { source: `${STATS_PATH}/api/send`, destination: `${UMAMI_ORIGIN}/api/send` },
    ];
  },
};

export default nextConfig;
