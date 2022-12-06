/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.novelai.net/",
      },
      {
        source: "/api/match",
        destination: "https://api.novelai.net/ai/generate",
      },
      {
        source: "/",
        destination: "https://api.novelai.net/ai/generate",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qzhocikvwsijwowyxhlm.supabase.co",
        pathname: "/storage/v1/object/sign/avatars/**",
      },
    ],
    domains: ["qzhocikvwsijwowyxhlm.supabase.co"],
  },
};

module.exports = nextConfig;
