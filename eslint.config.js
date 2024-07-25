// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'warn', // or "error"
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_'
                }
            ],
            'no-unused-private-class-members': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            // semicolons: off, prefer, singlequote

            'no-extra-semi': 'off',
            semi: ['error', 'never'],
            quotes: ['error', 'single'],
            // prefer property without quotes
            'quote-props': ['error', 'as-needed'],
            // prefer const over let
            'prefer-const': 'error',
            // remove console.log
            // 'no-console': 'off',
        }
    }
)