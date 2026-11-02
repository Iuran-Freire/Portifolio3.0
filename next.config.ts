import type { NextConfig } from "next";

// Site 100% estático: o build gera a pasta `out/`, publicada no Cloudflare.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
