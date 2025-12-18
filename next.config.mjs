/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'cbmro.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'www.cbmro.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
