import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: 特定のURLから
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
