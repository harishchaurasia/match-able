// next.config.js
const webpack = require("webpack");

module.exports = {
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
      })
    );

    // Prevent client-side bundling of server-only modules
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        stream: false,
        zlib: false,
        "process/browser": require.resolve("process/browser"),
      };
    }

    return config;
  },
};
