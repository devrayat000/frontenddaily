module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  plugins: ["@typescript-eslint", "simple-import-sort"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "warn",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { varsIgnorePattern: "^_", ignoreRestSiblings: true },
    ],
  },
};
