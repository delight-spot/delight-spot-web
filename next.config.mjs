/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:8000/api/v1/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
