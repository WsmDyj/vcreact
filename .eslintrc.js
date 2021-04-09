module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],

  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  parserOptions: {
    //指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'prettier/prettier': 'error',
    'no-var-requires': 'off',
    "react/prop-types": 'off',
    "react-hooks/exhaustive-deps": "off",
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-use-before-define': 'off',
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": 'off',
    "@typescript-eslint/ban-types": 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    "@typescript-eslint/explicit-function-return-type": ['off'],
    "@typescript-eslint/explicit-module-boundary-types": ['off'],
    "@typescript-eslint/no-explicit-any": ["off"]
  }
}
