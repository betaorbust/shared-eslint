module.exports = {
	rules: {
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
		// Yeah, don't do that
		'no-console': 'error',
		// Allow whole file
		'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
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
	},
};
