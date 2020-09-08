const path = require('path');

module.exports = {
    extends: ['mobi2go'],
    env: {
        browser: true,
        es6: true,
    },
    globals: {},
    settings: {
        'import/resolver': {
            node: {
                paths: [path.resolve(__dirname, 'src')],
            },
        },
    },
    parser: 'babel-eslint',
};
