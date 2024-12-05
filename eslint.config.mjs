import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist'

export default typescriptEslint.config(
    { ignores: ['*.d.ts', '**/coverage', '**/dist'] }, // Ignore type declaration and build directories
    {
        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.recommended,
            ...eslintPluginVue.configs['flat/recommended'],
            eslintPluginPerfectionist.configs['recommended-natural'],
        ],
        files: ['**/*.{ts,vue}'], // This targets TypeScript and Vue files
        languageOptions: {
            ecmaVersion: 'latest', // Latest ECMAScript features
            sourceType: 'module', // Support for ECMAScript modules
            globals: globals.browser, // Browser globals
            parserOptions: {
                parser: typescriptEslint.parser, // Use TypeScript parser
            },
        },
        plugins: {
            prettier: eslintPluginPrettier // Set Prettier plugin
        },
        rules: {
            'prettier/prettier': ['error', {
                arrowParens: 'avoid', // Avoid parentheses around single argument arrow functions
                endOfLine: 'lf', // Line endings to be LF (Unix-style)
                printWidth: 160, // Maximum line width
                semi: false, // No semicolons
                singleQuote: true, // Use single quotes
                trailingComma: 'none', // No trailing commas
            }],
            'no-restricted-imports': ['error', {
                paths: [{
                    importNames: ['default'],
                    message: 'No default import is allowed',
                    name: 'vue',
                }],
            }],
            'perfectionist/sort-imports': ['error', { newlinesBetween: 'never' }], // Sort imports without newlines
            '@typescript-eslint/no-explicit-any': 'off', // Allow `any` type if necessary
            'vue/multi-word-component-names': 'off', // Disable rule for multi-word component names in Vue
            'vue/no-v-html': 'warn', // Avoid using v-html for security reasons
        },
    },
    eslintConfigPrettier
)
