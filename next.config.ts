import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // 크기 제한 상향
    },
  },
};

export default nextConfig;
