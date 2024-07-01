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
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 't1.kakaocdn.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'delight-spot.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
