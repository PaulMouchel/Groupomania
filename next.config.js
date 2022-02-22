/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.IMAGES_DOMAIN, process.env.S3_IMAGES_DOMAIN_EU_WEST, process.env.S3_IMAGES_DOMAIN],
  },
}

module.exports = nextConfig

