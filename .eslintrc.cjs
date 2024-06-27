// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const tsconfig = path.join(__dirname, "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: { project: tsconfig },
  plugins: [
    "@typescript-eslint",
    "eslint-plugin-react-compiler",
    "prettier",
    "tailwindcss",
  ],
  root: true,
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    // * Don't Have To Import React
    "react/react-in-jsx-scope": "off",
    // * Don't Need Prop Types
    "react/prop-types": "off",
    "prettier/prettier": ["warn", {}, { usePrettierrc: true }],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "error",
    // * NextJS Image
    // "@next/next/no-img-element": "off",

    // * React-Compiler
    "react-compiler/react-compiler": "error",
  },
  ignorePatterns: ["node_modules/", "build/", "dist/", ".next/"],
};
