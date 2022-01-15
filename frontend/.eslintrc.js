module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:prettier/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:testing-library/react', // For React Testing Library
        'plugin:cypress/recommended', // For Cypress (recommended config)
    ],
    plugins: ['better-styled-components', 'testing-library', 'cypress'],
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
        'testing-library/await-async-query': 'error',
        'testing-library/no-await-sync-query': 'error',
        'testing-library/no-debug': 'warn',
        'testing-library/no-dom-import': 'off',
        /////////////////
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
        {
            // 3) Testing library ESLint to run only in files located in __test__ dir
            files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:testing-library/react'],
        },
    ],
};
