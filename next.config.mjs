/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // allow local public/ images via next/image
    remotePatterns: [],
    unoptimized: false,
  },
};

export default nextConfig;
