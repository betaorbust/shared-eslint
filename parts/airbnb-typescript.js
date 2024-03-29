const { rules: baseRules } = require('./airbnb-typescript-base');

module.exports = {
	rules: {
		...baseRules,
		// I like the idea, but between not using null and stricter types,
		// I just keep fighting this one over and over. If we disable the no-null
		// rule then we should turn this on.
		'react/require-default-props': 'off',
		// Prettier handles this
		'@typescript-eslint/comma-dangle': ['off', {}],
		// We don't need these in TS, generally
		'react/prop-types': 'off',
	},
};
