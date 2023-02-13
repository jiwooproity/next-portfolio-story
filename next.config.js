/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.notion.so", "notion.so", "images.unsplash.com", "s3.us-west-2.amazonaws.com"],
    format: ["image/png", "image/webp", "image/jpeg", "image/gif"],
    path: "/_next/image",
    loader: "default",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
