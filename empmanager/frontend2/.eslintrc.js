module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:prettier/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    plugins: ['better-styled-components'],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        // '@typescript-eslint/interface-name-prefix': ['error', 'always'],
        // '@typescript-eslint/no-empty-interface': 'off',
        // '@typescript-eslint/no-comma-dangle': 'off',
        // '@typescript-eslint/explicit-function-return-type': 'off',
        'react/display-name': 'off',
        'better-styled-components/sort-declarations-alphabetically': 2,
        'prettier/prettier': [
            'error',
            {
                semi: true,
                trailingComma: 'all',
                singleQuote: true,
                printWidth: 120,
                tabWidth: 4,
                endOfLine: 'auto',
            },
        ],
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    overrides: [
        {
            files: ['**/*.tsx'],
            rules: {
                'react/prop-types': 'off',
            },
        },
    ],
};
