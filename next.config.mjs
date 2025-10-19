/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "api.microlink.io", // Microlink Image Preview
        },
      ],
    },
    // Suppress specific serialization warnings
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
    // Reduce console warnings
    webpack: (config, { dev }) => {
      if (dev) {
        config.optimization = {
          ...config.optimization,
          splitChunks: {
            ...config.optimization.splitChunks,
            cacheGroups: {
              ...config.optimization.splitChunks.cacheGroups,
              default: false,
              vendors: false,
            },
          },
        };
      }
      return config;
    },
  };
  
  export default nextConfig;
  