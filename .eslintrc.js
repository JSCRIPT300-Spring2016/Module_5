module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
       "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "semi": ["error", "always"],
        "semi-spacing": "error",
        "no-unused-vars": ["error", { "vars": "local" }],
        "quotes": ["error", "single"],
        "comma-dangle": [
            "error",
            "never"
        ],
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "newline-before-return": [
            "error"
        ]
    }
};
