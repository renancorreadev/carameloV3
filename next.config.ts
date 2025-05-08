import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'pino-pretty', 'lokijs', 'encoding'];
    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
