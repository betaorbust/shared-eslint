const { cheapClone, orderExtensions } = require('./utilities');

const ORDERED_EXTENSIONS = [
	'eslint:recommended',
	'plugin:promise/recommended',
	'plugin:eslint-comments/recommended',
	'plugin:@typescript-eslint/recommended',
	'plugin:@typescript-eslint/recommended-requiring-type-checking',
	'plugin:import/react',
	'plugin:import/typescript',
	'airbnb-base',
	'airbnb',
	'airbnb-typescript/base',
	'airbnb-typescript',
	'airbnb/hooks',
	'plugin:jest/recommended',
	'plugin:jest/style',
	'plugin:unicorn/recommended',
	'prettier',
];

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
	// I like the idea, but reduce is just so dang useful to me.
	// Might change in the future, but for now, turning it off.
	'unicorn/no-reduce': 'off',
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

const javascript = {
	config: {
		env: {
			browser: true,
			node: true,
		},
		parserOptions: {
			ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
			sourceType: 'module', // Allows for the use of imports
		},
		extends: orderExtensions(ORDERED_EXTENSIONS, [
			'eslint:recommended',
			'plugin:unicorn/recommended',
			'plugin:promise/recommended',
			'plugin:eslint-comments/recommended',
			'airbnb-base',
			'prettier',
		]),
		rules: someGoodRules,
	},
	devDeps: [
		'eslint',
		// 'prettier',
		'eslint-plugin-unicorn',
		'eslint-plugin-promise',
		'eslint-plugin-eslint-comments',
		'eslint-config-airbnb-base',
		'eslint-plugin-import',
		'eslint-config-prettier',
	],
};

const typescript = {
	config: {
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
		extends: orderExtensions(ORDERED_EXTENSIONS, [
			'plugin:eslint-comments/recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:unicorn/recommended',
			'plugin:promise/recommended',
			'plugin:import/typescript',
			'airbnb-typescript/base',
			'prettier',
		]),
		rules: {
			...someGoodRules,
			'@typescript-eslint/explicit-function-return-type': 'error',
			// ayup
			'@typescript-eslint/no-unused-vars': 'error',
			// Prettier handles all of this
			'@typescript-eslint/indent': 'off',
		},
	},
	devDeps: [
		'eslint',
		// 'typescript',
		// 'prettier',
		'@typescript-eslint/parser',
		'@typescript-eslint/eslint-plugin',
		'eslint-plugin-unicorn',
		'eslint-plugin-promise',
		'eslint-plugin-eslint-comments',
		'betaorbust/eslint-config-airbnb-typescript',
		'eslint-plugin-import',
		'eslint-config-prettier',
	],
};

const react = {
	config: {
		...cheapClone(javascript.config),
		extends: orderExtensions(ORDERED_EXTENSIONS, [
			...javascript.config.extends,
			'airbnb',
			'plugin:import/react',
		]),
	},
	devDeps: [
		...javascript.devDeps,
		'eslint-plugin-react',
		'eslint-plugin-react-hooks',
		'eslint-plugin-jsx-a11y',
	],
};

const reactTypescript = {
	config: {
		...cheapClone(typescript.config),
		extends: orderExtensions(ORDERED_EXTENSIONS, [
			...typescript.config.extends,
			'airbnb-typescript',
			'airbnb/hooks',
		]),
	},
	devDeps: [
		...typescript.devDeps,
		'eslint-plugin-jsx-a11y',
		'eslint-plugin-react',
		'eslint-plugin-react-hooks',
	],
};

const jest = {
	config: {
		...cheapClone(javascript.config),
		extends: orderExtensions(ORDERED_EXTENSIONS, [
			...javascript.config.extends,
			'plugin:jest/recommended',
			'plugin:jest/style',
		]),
	},
	devDeps: [...javascript.devDeps, 'eslint-plugin-jest'],
};

const jestTypescript = {
	config: {
		...cheapClone(typescript.config),
		extends: orderExtensions(ORDERED_EXTENSIONS, [
			...typescript.config.extends,
			'plugin:jest/recommended',
			'plugin:jest/style',
		]),
	},
	devDeps: [...javascript.devDeps, 'eslint-plugin-jest'],
};

module.exports = {
	javascript,
	typescript,
	react,
	reactTypescript,
	jest,
	jestTypescript,
};
