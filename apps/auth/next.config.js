const nextConfig = {
  transpilePackages: ["@labs/auth", "@labs/ui", "@labs/database"],
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "http://localhost:3002/api/auth/:path*", // Proxy to Auth Service
      },
    ];
  },
};

module.exports = nextConfig;
