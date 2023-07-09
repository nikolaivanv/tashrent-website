/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frankfurt.apollo.olxcdn.com',
        //port: '443',
        pathname: '/v1/files/**',
      },
    ],
  },
}

module.exports = nextConfig
