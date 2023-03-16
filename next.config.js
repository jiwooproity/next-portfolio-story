/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    path: "/_next/image",
    loader: "default",
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
