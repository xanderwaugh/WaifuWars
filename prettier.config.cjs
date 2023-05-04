/** @type {import("prettier").Config} */
const config = {
  arrowParens: "always",
  printWidth: 80,
  requirePragma: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  endOfLine: "auto",
  singleQuote: false,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
