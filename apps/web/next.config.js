/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: {
    module: (config) => {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      });

      return config;
    },
  },
};

module.exports = nextConfig;
