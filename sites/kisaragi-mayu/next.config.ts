import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: process.env.VERCEL === "1" ? "tsconfig.vercel.json" : "tsconfig.json",
  },
};

export default nextConfig;
