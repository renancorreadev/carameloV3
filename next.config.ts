import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {

    ignoreBuildErrors: true,
  },
  eslint: {
    // desabilita o ESLint somente durante o `next build`
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'pino-pretty', 'lokijs', 'encoding'];
    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
