const { rules } = require('./airbnb-base');

module.exports = {
	rules: {
		...rules,
		'@typescript-eslint/indent': 'off',
		// Typescript won't compile with undefined variables anyways.
		'no-undef': 'off',
		// Prettier handles this
		'@typescript-eslint/comma-dangle': ['off', {}],
	},
};
