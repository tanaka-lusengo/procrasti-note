/* eslint-disable @typescript-eslint/no-var-requires */
const securityHeaders = require('./securityHeaders.js');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security Headers
          ...securityHeaders,
        ],
      },
    ];
  },
};

module.exports = nextConfig;
