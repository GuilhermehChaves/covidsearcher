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
        "no-unused-vars": ["error", {"argsIgnorePattern": "next"} ],
        "no-param-reassign": 0
    }
};