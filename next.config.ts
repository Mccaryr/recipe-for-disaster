import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["fkneehclorkhvqsvdwdf.supabase.co"],
  },
};

export default nextConfig;
