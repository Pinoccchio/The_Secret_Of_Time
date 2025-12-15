import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Skip TypeScript checking during production builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
