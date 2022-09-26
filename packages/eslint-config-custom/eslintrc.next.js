module.exports = {
  extends: ["next/core-web-vitals", "turbo", "prettier"],
  plugins: ["@typescript-eslint", "simple-import-sort"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "warn",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
  },
};
