module.exports = {
    env: {
        browser: true,
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'arrow-parens': ['error', 'always'],
        'no-multi-spaces': 'error',
        'no-console': 'error',
    },
    parser: 'babel-eslint',
};
