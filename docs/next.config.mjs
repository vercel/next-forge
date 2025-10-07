import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vercel.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
    ],
  },

  // biome-ignore lint/suspicious/useAwait: "redirects is async"
  redirects: async () => [
    {
      source: "/apps",
      destination: "/apps/api",
      permanent: true,
    },
    {
      source: "/packages",
      destination: "/packages/ai",
      permanent: true,
    },
    {
      source: "/recipes",
      destination: "/recipes/ai",
      permanent: true,
    },
    {
      source: "/migrations",
      destination: "/migrations/authentication/authjs",
      permanent: true,
    },
    {
      source: "/addons",
      destination: "/addons/friendlier-words",
      permanent: true,
    },
  ],

  // biome-ignore lint/suspicious/useAwait: "rewrites is async"
  rewrites: async () => [
    {
      source: "/:path*.mdx",
      destination: "/llms.mdx/:path*",
    },
  ],
};

export default withMDX(config);
