const withImages = require("next-images");
module.exports = withImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif"],

  webpack(config, options) {
    config.node = {
      fs: "empty",
    };

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    return config;
  },
});
