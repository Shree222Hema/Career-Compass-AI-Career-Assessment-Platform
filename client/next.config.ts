import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // We use an environment variable (often set automatically by Replit) or fallback to localhost
        destination: process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/api/:path*` : 'http://localhost:5000/api/:path*'
      }
    ];
  }
};

export default nextConfig;
