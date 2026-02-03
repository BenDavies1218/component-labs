/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Enable static export for easier deployment
  output: 'export',
  // Disable trailing slashes
  trailingSlash: false,
}

export default nextConfig
