// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: ["@typescript-eslint", "prettier", "tailwindcss"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    // "plugin:react-hooks/recommended",
  ],
  rules: {
    "react/react-in-jsx-scope": "off", // Don't Have To Import React
    "react/prop-types": "off", // Don't Need Prop Types
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
    // NextJS Image
    "@next/next/no-img-element": "off",
  },
  ignorePatterns: ["node_modules/", "build/", "dist/", ".next/"],
};
