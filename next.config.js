/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.notion.so", "images.unsplash.com", "s3.us-west-2.amazonaws.com"],
    format: ["image/png", "image/webp", "image/jpeg", "image/gif"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
