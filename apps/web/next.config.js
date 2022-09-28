const withTM = require("next-transpile-modules")(["ui"]);
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  // eslint-disable-next-line
  enabled: process.env.ANALIZE === true,
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["media.graphassets.com"],
  },
};

module.exports = withBundleAnalyzer(withTM(config));
