import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The paid kit lives outside /public and is served by /api/download.
  outputFileTracingIncludes: {
    "/api/download": ["./private/**"]
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }]
  }
};

export default nextConfig;
