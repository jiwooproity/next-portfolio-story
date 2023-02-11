/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "https://portfolio-story.vercel.app", "s3.us-west-2.amazonaws.com", "*"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://portfolio-story.vercel.app",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
