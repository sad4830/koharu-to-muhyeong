import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: process.env.VERCEL === "1" ? {
    tsconfigPath: "tsconfig.vercel.json",
  } : undefined,
};

export default nextConfig;
