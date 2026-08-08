import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@card-villa/schema', '@card-villa/templates'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
