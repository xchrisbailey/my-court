/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  serverExternalPackages: ['@node-rs/argon2'],
};

export default nextConfig;
