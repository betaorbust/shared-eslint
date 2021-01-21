module.exports = {
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'error',
		// ayup
		'@typescript-eslint/no-unused-vars': 'error',
		// Prettier handles all of this
		'@typescript-eslint/indent': ['off', {}],
		// Prettier handles this
		'@typescript-eslint/comma-dangle': ['off', {}],
	},
};
