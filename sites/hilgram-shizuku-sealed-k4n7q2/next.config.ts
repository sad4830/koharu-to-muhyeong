import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: process.env.VERCEL === "1" ? {
    tsconfigPath: "tsconfig.vercel.json",
  } : undefined,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
