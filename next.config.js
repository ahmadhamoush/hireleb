/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    MONGODB_URI:'mongodb+srv://hamoush:mThldMFdYBf37Tgr@cluster0.evplv1k.mongodb.net/hireleb?retryWrites=true&w=majority'
  }
}

module.exports = nextConfig
