module.exports = () => {
	return {
		env: {
			browser: true,
			node: true,
		},
		parserOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
		},
		plugins: ['unicorn', 'promise', 'eslint-comments', 'import'],
		extends: [
			'eslint:recommended',
			'../parts/eslint',
			'plugin:unicorn/recommended',
			'../parts/unicorn',
			'plugin:promise/recommended',
			'../parts/promise',
			'plugin:eslint-comments/recommended',
			'../parts/comments',
			'airbnb-base',
			'../parts/airbnb-base',
			'prettier',
		],
		overrides: [
			{
				files: ['*.ts', '*.tsx'],
				parserOptions: {
					project: './tsconfig.json',
				},
				parser: '@typescript-eslint/parser',
				plugins: ['import', '@typescript-eslint/eslint-plugin'],
				extends: [
					'plugin:@typescript-eslint/recommended',
					'../parts/typescript-eslint',
					'plugin:import/typescript',
					'airbnb-typescript/base',
					'../parts/airbnb-typescript-base',
					'prettier',
				],
			},
			{
				files: ['*.jsx'],
				plugins: ['import'],
				extends: [
					'airbnb',
					'airbnb/hooks',
					'../parts/airbnb',
					'prettier',
					'prettier/react',
				],
			},
			{
				files: ['*.tsx'],
				extends: [
					'airbnb-typescript',
					'airbnb/hooks',
					'../parts/airbnb-typescript',
					'prettier',
					'prettier/react',
				],
			},
			{
				files: [
					// The right way
					'*.jest.js',
					'*.jest.jsx',
					'*.jest.ts',
					'*.jest.tsx',
					// The general way
					'*.test.js',
					'*.test.jsx',
					'*.test.ts',
					'*.test.tsx',
				],
				plugins: ['jest'],
				extends: [
					'plugin:jest/recommended',
					'plugin:jest/style',
					'../parts/jest',
				],
			},
		],
	};
};