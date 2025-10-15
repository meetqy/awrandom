import { FlatCompat } from "@eslint/eslintrc";
import tseslint, { configs } from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  {
    ignores: [".next", "*.js", "next-env.d.ts", "node_modules"],
  },
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("plugin:import/recommended"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [...configs.recommended, ...configs.recommendedTypeChecked, ...configs.stylisticTypeChecked],
    rules: {
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports", fixStyle: "inline-type-imports" }],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "next/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "**/*.{css,scss,less}",
              group: "object",
              position: "after",
            },
            {
              pattern: "**/*.{png,jpg,jpeg,gif,svg}",
              group: "object",
              position: "after",
            },
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "next"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc", // 升序排列
            caseInsensitive: true, // 忽略大小写
          },
        },
      ],
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
);
