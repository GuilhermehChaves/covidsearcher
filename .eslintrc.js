module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "airbnb-base",
        "prettier",
    ],
    "parser": 'babel-eslint',
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "plugins": ['prettier'],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "prettier/prettier": "error",
        "no-unused-vars": ["error", {"argsIgnorePattern": "next"} ]
    }
};