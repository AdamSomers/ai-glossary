/** @type {import('next').NextConfig} */
const nextConfig = {
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