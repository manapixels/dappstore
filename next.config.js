/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/finance',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
