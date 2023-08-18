// eslint-disable-next-line @typescript-eslint/no-var-requires
// const path = require("path");

/* eslint-env node */
/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off", // Don't Have To Import React
    "react/prop-types": "off", // Don't Need Prop Types
    "prettier/prettier": ["warn", {}, { usePrettierrc: true }],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    // NextJS Image
    "@next/next/no-img-element": "off",
  },
  ignorePatterns: ["node_modules/", "build/", "dist/", ".next/"],
};
