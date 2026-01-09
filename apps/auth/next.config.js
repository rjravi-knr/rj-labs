const nextConfig = {
  transpilePackages: ["@labs/auth", "@labs/ui"],
  async rewrites() {
    const authUrl = process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:8000";
    console.log("[NextConfig] Proxying /api/auth to:", authUrl);
    
    return [
      {
        source: "/api/auth/:path*",
        destination: `${authUrl}/api/auth/:path*`, // Proxy to Auth Service
      },
    ];
  },
};

module.exports = nextConfig;
