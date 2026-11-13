import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The paid kit lives outside /public and is served by /api/download.
  outputFileTracingIncludes: {
    "/api/download": ["./private/**"]
  }
};

export default nextConfig;
