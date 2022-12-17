/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["replicate.com", "replicate.delivery", "arweave.net"],
  },
  env: {
    OPENAI_API_TOKEN: `${process.env.OPENAI_API_TOKEN}`,
    INFURA_IPFS_ID: `${process.env.INFURA_IPFS_ID}`,
    INFURA_IPFS_SECRET: `${process.env.INFURA_IPFS_SECRET}`,
    INFURA_ID: `${process.env.INFURA_ID}`
  }
};

module.exports = nextConfig;
