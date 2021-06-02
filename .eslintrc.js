module.exports = {
  extends: [
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    index: [0, 2], // 回车使用两个空格
    'react/jsx-props-no-spreading': 'off', // 组件中可以使用 ...扩展运算符
    'react/react-in-jsx-scope': 'off',
  },
};
