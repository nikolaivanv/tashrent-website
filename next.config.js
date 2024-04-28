/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frankfurt.apollo.olxcdn.com',
        //port: '443',
        pathname: '/v1/files/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        //port: '443',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig
