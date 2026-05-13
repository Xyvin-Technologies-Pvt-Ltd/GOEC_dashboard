import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    ignores: ["build/**", "node_modules/**", "public/**"],
  },
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // API wrappers intentionally rethrow; keeps consistent shape for callers
      "no-useless-catch": "off",
      "react/display-name": "off",
      "react/jsx-key": "warn",
      "react/no-unescaped-entities": "off",
      // Guardrail: ban arbitrary hex/pixel values inside Tailwind className props.
      // Use design tokens defined in src/index.css @theme and src/theme/tokens.js instead.
      // Brand-gradient utilities (from-[#...] to-[#...]) and dimension utilities are allowed via overrides below.
      "no-restricted-syntax": [
        "warn",
        {
          selector:
            "JSXAttribute[name.name='className'] > Literal[value=/\\[#[0-9a-fA-F]{3,8}\\]/]",
          message:
            "Avoid arbitrary hex colors in className. Use semantic tokens from src/index.css @theme (e.g. bg-card, text-muted-foreground, bg-surface-deep).",
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  prettier,
];
