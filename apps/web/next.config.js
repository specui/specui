/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
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
