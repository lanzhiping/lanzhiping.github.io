/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    domains: [
      "avatars.githubusercontent.com",
      "raw.githubusercontent.com",
      "labs.mysql.com",
      "nodejs.org",
    ],
  },
  experimental: { images: { layoutRaw: true } },
  sassOptions: {
    includePaths: [
      path.join(__dirname, "styles"),
      path.join(__dirname, "components"),
    ],
  },
};

module.exports = nextConfig;
