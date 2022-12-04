/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["replicate.com", "replicate.delivery"],
  },
  env: {
    OPENAI_API_TOKEN: `${process.env.OPENAI_API_TOKEN}`
  }
};

module.exports = nextConfig;
