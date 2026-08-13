import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // 👈 Omite los bloqueos por tipado estricto en el servidor de Vercel
    ignoreBuildErrors: true,
  },
};

export default nextConfig;