module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'tailwindcss', 'prettier'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:tailwindcss/recommended',
        'prettier',
      ],
      rules: {
        'prettier/prettier': 'error',
      },
    },
  ],
};
