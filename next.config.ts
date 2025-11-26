import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
        pathname: "/**", // This allows all paths under the hostname (adjust if you need more restrictions)
      },
    ],
  },
};

export default nextConfig;
