import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  assetPrefix: isProd ? '/wedding_invitation' : '',
  basePath: isProd ? '/wedding_invitation' : '',
};

export default nextConfig;
