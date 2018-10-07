module.exports = {
    "plugins": [
        "jest"
    ],
    "extends": [
        "airbnb-base",
        "plugin:jest/recommended",
    ],
    "env": {
        "jest/globals": true,
    },
    "rules": {
        "indent": ["error", 2],
    },
};