const { updateConfigForTypes, SUPPORTED_TYPES } = require('./utilities.js');

function makeConfig({ withJest, withTypescript, withReact, isRoot = true }) {
	const someGoodRules = {
		// Named exports are more extensible
		'import/no-default-export': 'error',
		// Named exports are more extensible
		'import/prefer-default-export': 'off',
		// Don't require extensions for known types
		'import/extensions': [
			'error',
			'ignorePackages',
			{ js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
		],
		// I love this idea, but in practice it catches too many legit names
		// like devDeps, pkg instead of the reserved "package" etc.
		'unicorn/prevent-abbreviations': 'off',
		// Yeah, don't do that
		'no-console': 'error',
		// Always space your comments
		'spaced-comment': ['error', 'always', { markers: ['/'] }],
		// Modifying the AirBnB style guide
		'no-restricted-syntax': [
			'error',
			{
				selector: 'ForInStatement',
				message:
					'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
			},
			// Deviating from the AirBnB style guide here because I think it should be fine
			// and is in direct conflict with unicorn/no-for-loop
			// {
			//   selector: 'ForOfStatement',
			//   message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
			// },
			{
				selector: 'LabeledStatement',
				message:
					'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
			},
			{
				selector: 'WithStatement',
				message:
					'`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
			},
		],
	};

	const javascriptBaseConfig = {
		env: {
			browser: true,
			node: true,
		},
		parserOptions: {
			ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
			sourceType: 'module', // Allows for the use of imports
		},
		extends: [
			'eslint:recommended',
			'plugin:unicorn/recommended',
			'plugin:promise/recommended',
			'plugin:eslint-comments/recommended',
			'airbnb-base',
			'prettier',
		],
		rules: someGoodRules,
	};

	const typescriptBaseConfig = {
		env: {
			browser: true,
			node: true,
		},
		parserOptions: {
			ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
			sourceType: 'module', // Allows for the use of imports
			project: './tsconfig.json',
		},
		parser: '@typescript-eslint/parser',
		plugins: ['@typescript-eslint/eslint-plugin'],
		extends: [
			'plugin:unicorn/recommended',
			'plugin:promise/recommended',
			'plugin:eslint-comments/recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:import/typescript',
			'eslint-config-airbnb-typescript/base',
			'prettier',
		],
		rules: {
			...someGoodRules,
			'@typescript-eslint/explicit-function-return-type': 'error',
			// ayup
			'@typescript-eslint/no-unused-vars': 'error',
			// Prettier handles all of this
			'@typescript-eslint/indent': 'off',
		},
	};

	const config = {
		root: !!isRoot,
		settings: {},
		overrides: [
			// Everything is an override
			{
				files: SUPPORTED_TYPES.js,
				...javascriptBaseConfig,
			},
		],
	};

	if (withReact) {
		config.overrides.push({
			files: SUPPORTED_TYPES.jsx,
			...javascriptBaseConfig,
		});
	}

	if (withTypescript) {
		config.overrides.push({
			files: SUPPORTED_TYPES.ts,
			...typescriptBaseConfig,
		});

		if (withReact) {
			config.overrides.push({
				files: SUPPORTED_TYPES.tsx,
				...typescriptBaseConfig,
				extends: [
					'plugin:@typescript-eslint/recommended',
					'plugin:import/react',
					'eslint-config-airbnb-typescript',
					'airbnb/hooks',
				],
			});
		}
	}

	if (withJest) {
		config.overrides.push({
			files: SUPPORTED_TYPES.jestJs,
			...javascriptBaseConfig,
			extends: [
				...javascriptBaseConfig.extends,
				'plugin:jest/recommended',
				'plugin:jest/style',
			],
		});

		if (withTypescript) {
			config.overrides.push({
				files: SUPPORTED_TYPES.jestTs,
				...typescriptBaseConfig,
				extends: ['plugin:jest/recommended', 'plugin:jest/style'],
			});
		}
	}
	return config;
}

function getDevelopmentDeps({ withReact, withJest, withTypescript }) {
	return [
		'@betaorbust/eslint-config',
		'eslint',
		'eslint-plugin-import',
		'eslint-config-prettier',
		'eslint-plugin-promise',
		'eslint-plugin-unicorn',
		'eslint-plugin-eslint-comments',
		'eslint-config-airbnb-base',
	].concat(
		withJest ? ['eslint-plugin-jest'] : [],
		withReact
			? [
					'eslint-plugin-jsx-a11y',
					'eslint-plugin-react',
					'eslint-plugin-react-hooks',
					'eslint-config-airbnb',
			  ]
			: [],
		withTypescript
			? ['eslint-config-airbnb-typescript', '@typescript-eslint/eslint-plugin']
			: []
	);
}

module.exports = {
	makeConfig,
	updateConfigForTypes,
	getDevDeps: getDevelopmentDeps,
	supportedTypes: Object.fromEntries([
		Object.keys(SUPPORTED_TYPES),
		Object.keys(SUPPORTED_TYPES),
	]),
};
