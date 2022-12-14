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
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/terms-conditions",
  //       destination:
  //         "https://www.termsandconditionsgenerator.com/live.php?token=fyelApp7EHLumpgl6KTy4ImHfb7v1CRE",
  //     },
  //   ];
  // },
};

module.exports = withBundleAnalyzer(config);
