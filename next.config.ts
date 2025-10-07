// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adicione esta parte:
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'https://i.postimg.cc',
        port: '',
        pathname: '/zBDyRN6w',
      },
    ],
  },
};

export default nextConfig;