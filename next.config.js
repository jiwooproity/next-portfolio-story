/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    i18n,
    domains: ["www.notion.so", "notion.so", "images.unsplash.com", "s3.us-west-2.amazonaws.com"],
    format: ["image/png", "image/webp", "image/jpeg", "image/gif"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
