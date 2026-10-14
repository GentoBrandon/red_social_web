import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // Deshabilita ESLint en la fase de compilación
  },
  /* config options here */
};

export default nextConfig;
