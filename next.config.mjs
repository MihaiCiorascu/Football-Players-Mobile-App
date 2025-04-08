/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (config, { isServer }) => {
    // Disable Babel for the main application
    if (!isServer) {
      config.module.rules = config.module.rules.filter(rule => {
        if (rule.use && rule.use.loader === 'next-babel-loader') {
          return false;
        }
        return true;
      });
    }
    return config;
  },
};

export default nextConfig;
