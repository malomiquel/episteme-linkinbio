import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: "/stats/script.js",
      destination: "https://cloud.umami.is/script.js",
    },
    {
      source: "/stats/:path*",
      destination: "https://cloud.umami.is/:path*",
    },
  ],
};

export default nextConfig;
