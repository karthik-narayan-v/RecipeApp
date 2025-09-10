module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "react-native",
    "import",
    "jest",
  ],
  env: {
    "react-native/react-native": true,
    jest: true,
  },
  ignorePatterns: [
    "node_modules/",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js",
    "build/",
    "dist/",
  ],
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/namespace": "off",
    "import/no-unresolved": ["error", { ignore: ["^react-native$"] }],
    "no-duplicate-imports": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
    jest: {
      version: 29,
    },
  },
};
