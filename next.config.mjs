/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    orgId: process.env.ORG_ID,
    apiKey: process.env.API_KEY,
  },
};

export default nextConfig;
