/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URL,
    CLOUD_NAME: process.env.CLOUD,
    API_KEY: process.env.CLOUD_API,
    API_SECRET: process.env.CLOUD_SECRET,
  },
}

module.exports = nextConfig
