import prettier from 'eslint-config-prettier';
import ts from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...ts.configs.recommended,
	prettier,
	{
		files: ['src/**/*.ts', 'types/**/*.d.ts'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: ['dist/']
	}
];
