/** @type {import('next').NextConfig} */

import withMDX from '@next/mdx';

const mdxConfig = withMDX({
    extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    ...mdxConfig,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/blog',
                permanent: true,
            },
        ];
    }
};

export default nextConfig;
