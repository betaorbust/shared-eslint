const APP_TYPES = {
	web: Symbol('web'),
	node: Symbol('node'),
};

const common = (type) => {
	if (!Object.values(APP_TYPES).includes(type)) {
		throw new Error(
			`Unknown app type '${type.toString()}'. Use only exported symbols from _common.js`
		);
	}
	return {
		env: {
			browser: true,
			node: true,
		},
		parserOptions: {
			ecmaVersion: 'latest',
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
				extends: ['airbnb', 'airbnb/hooks', '../parts/airbnb', 'prettier'],
			},
			{
				files: ['*.tsx'],
				extends: [
					'airbnb',
					'airbnb-typescript',
					'airbnb/hooks',
					'../parts/airbnb-typescript',
					'prettier',
				],
			},
			{
				files: [
					'*.jest.js',
					'*.jest.jsx',
					'*.jest.ts',
					'*.jest.tsx',
					'*.test.js',
					'*.test.jsx',
					'*.test.ts',
					'*.test.tsx',
					'*.spec.js',
					'*.spec.jsx',
					'*.spec.ts',
					'*.spec.tsx',
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

module.exports = {
	APP_TYPES,
	common,
};
