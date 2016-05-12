module.exports = {
    "env": {
        "node": true
    },
  
    "globals": {
        "google": true,
        "result": true,
        "module": true,
        "round": true,
        "express": true
        
     },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-undef": [
            "error"
        ],
        "no-unused-vars": [
            "error"
        ],
        
        "no-console": [
            "error"
        ],
        "comma-dangle": [
            "error",
            "never"
        ],
        "no-trailing-spaces": [
            "error", 
            { "skipBlankLines": true }
        ],
        "object-curly-spacing": [
        "error",
        "always"
        ],
        "newline-before-return":[
        "error"
        ]
    }
};