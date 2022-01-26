module.exports = {
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb-typescript',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: [
    'unused-imports',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': [0, 'error', 'windows'],
    // 'operator-linebreak': ["error", "before"], // todo prettier не поддерживает это правило, будет в следующем мажорном релизе https://github.com/prettier/prettier/issues/3806
    '@typescript-eslint/no-unused-vars': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'arrow-body-style': 'off',
    'curly': ['error', 'all'],
    'consistent-return': 'off',
    'func-names': 'off',
    'function-paren-newline': ['error', 'multiline-arguments'],
    'implicit-arrow-linebreak': 'off',
    'max-len': ['error', {
      'code': 120,
      'ignorePattern': '^import\\s.+\\sfrom\\s.+;$',
      'ignoreStrings': true,
      'ignoreUrls': true,
      'ignoreRegExpLiterals': true,
      'ignoreTemplateLiterals': true,
    }],
    'newline-before-return': 'error',
    'no-console': [
      'warn',
      {
        'allow': ['error']
      }
    ],
    'no-cond-assign': ['error', 'except-parens'],
    'no-implicit-coercion': ['error'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'nonblock-statement-body-position': ['error', 'beside', { overrides: {} }],
    'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': false }],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/destructuring-assignment': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-sort-props': 'error',
    'react/no-unescaped-entities': 'off',
    'react/no-unused-prop-types': 'error',
    'react/require-default-props': 'off',
    'react/state-in-constructor': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        'vars': 'all',
        'varsIgnorePattern': '^_',
        'args': 'after-used',
        'argsIgnorePattern': '^_',
        'ignoreRestSiblings': true,
      }
    ],
  },
};
