import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static-first marketing pages; only the quote route handler is dynamic.
  reactStrictMode: true,
  // Modern image formats for real photography when it lands.
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
