/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.amazon.com', 'm.media-amazon.com'],
  },
  async redirects() {
    return [
      {
        source: '/terms',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;