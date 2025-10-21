import js from "@eslint/js"
import { defineConfig } from "eslint/config"
import pluginReact from "eslint-plugin-react"
import globals from "globals"
import tseslint from "typescript-eslint"
import { FlatCompat } from "@eslint/eslintrc"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
})

export default defineConfig([
  {
    ignores: [
      ".next",
      "next-env.d.ts",
      "eslint.config.mjs",
      "webpack.config.js",
      "babel.config.js",
      "postcss.config.js",
      "scripts/generate.ts",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      "import/ignore": ["webpack.config.js", "babel.config.js", "postcss.config.js"],
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...compat.extends("next/core-web-vitals"),

  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          // 'newlines-between': 'always',
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/app/**",
              group: "internal",
            },
            {
              pattern: "@/pages/**",
              group: "internal",
            },
            {
              pattern: "@/widgets/**",
              group: "internal",
            },
            {
              pattern: "@/features/**",
              group: "internal",
            },
            {
              pattern: "@/entities/**",
              group: "internal",
            },
            {
              pattern: "@/shared/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
])
