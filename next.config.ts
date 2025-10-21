import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Se seu repositório não for username.github.io, descomente e ajuste a linha abaixo:
  // basePath: '/wheel-to-wheel',
  // assetPrefix: '/wheel-to-wheel/',
};

export default nextConfig;
