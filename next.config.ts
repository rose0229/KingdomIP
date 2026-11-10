import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The paid kit lives outside /public and is served by /api/download.
  outputFileTracingIncludes: {
    "/api/download": ["./private/**"]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  }
};

export default nextConfig;
