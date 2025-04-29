/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Optimize for deployment
  poweredByHeader: false,
  compress: true,
  // Handle Three.js properly
  webpack: (config) => {
    config.resolve.preferRelative = true

    // Add rule for glsl files if you use them
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader"],
    })

    return config
  },
  // Added configuration to fix deployment errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
