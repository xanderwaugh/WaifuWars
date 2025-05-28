/* eslint-disable import-x/no-named-as-default-member */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// @ts-check

/// <reference types="./eslint.d.ts" />

import * as path from "node:path";
import react from "@eslint-react/eslint-plugin";
import { includeIgnoreFile } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import eslintPluginImportX from "eslint-plugin-import-x";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginOnlyWarn from "eslint-plugin-only-warn";
import regexPlugin from "eslint-plugin-regexp";
import security from "eslint-plugin-security";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const config = tseslint.config(
  // Ignore files not tracked by VCS and any config files
  includeIgnoreFile(path.join(import.meta.dirname, ".gitignore")),
  { ignores: [".next", "node_modules"] },
  // Base
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // comments.recommended,
  regexPlugin.configs["flat/recommended"],
  jsxA11y.flatConfigs.recommended,

  security.configs.recommended,

  // Next.js / React
  ...compat.extends("plugin:@next/next/recommended"),
  ...compat.extends("plugin:react-hooks/recommended"),
  ...compat.plugins("react-compiler"),
  react.configs["recommended-type-checked"],

  // Tailwind
  ...tailwind.configs["flat/recommended"],

  // * New
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  regexPlugin.configs["flat/recommended"],
  security.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      import: importPlugin,
      "only-warn": eslintPluginOnlyWarn,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      tailwindcss: {
        callees: ["classnames", "clsx", "ctl", "cn", "cva"],
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],

      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],

      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        { allowConstantLoopConditions: true },
      ],

      "@typescript-eslint/consistent-type-exports": [
        "error",
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],

      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],

      "import-x/no-unresolved": ["error", { ignore: ["geist"] }],
      "react-compiler/react-compiler": "error",

      // * Mine
      "@eslint-react/no-unstable-context-value": ["off"],
      "@typescript-eslint/no-unnecessary-type-parameters": ["off"],
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": ["off"],
      "@typescript-eslint/no-confusing-void-expression": ["off"],
    },
  },
  {
    files: ["**/*.cjs", "**/*.cts"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: { parserOptions: { projectService: true } },
  },
  prettierConfig,
);

export default config;
