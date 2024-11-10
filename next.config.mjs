/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hvklpesjnyuizkkjmxxc.supabase.co",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["vscode-oniguruma", "shiki"],
  },
};

export default nextConfig;
