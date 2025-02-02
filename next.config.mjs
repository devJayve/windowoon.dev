/** @type {import('next').NextConfig} */

import withMDX from '@next/mdx';

const mdxConfig = withMDX({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    READ_DATABASE_URL: process.env.READ_DATABASE_URL,
  },
  images: {
    domains: [process.env.BLOB_BASE_DOMAIN],
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/post',
        permanent: true,
      },
    ];
  },
  ...mdxConfig,
};

export default nextConfig;
