/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  devIndicators: {
    position: 'bottom-right',
  },
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;