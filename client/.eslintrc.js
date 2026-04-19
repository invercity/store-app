module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    ignorePatterns: ['dist', '.eslintrc.js', 'node_modules'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react/prop-types': 'off',
    },
};
