/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // We use server actions to let the server handle the server DB write operations
    // or similar stuff that the client isn't allowed to do.
    serverActions: true,
  },
};

module.exports = nextConfig;
