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
