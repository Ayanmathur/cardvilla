import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@card-villa/schema', '@card-villa/templates'],
};

export default nextConfig;
