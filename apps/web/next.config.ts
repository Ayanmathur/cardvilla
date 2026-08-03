import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@card-villa/schema'],
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
