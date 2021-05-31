module.exports = {
  /* config options here */
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.node = {
      fs: "empty",
    };
    return config;
  },
};
