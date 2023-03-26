/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/category/finance',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
