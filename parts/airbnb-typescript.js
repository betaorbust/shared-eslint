const { rules: baseRules } = require('./airbnb-typescript-base');

module.exports = {
	rules: {
		...baseRules,
		'import/no-default-export': 'off',
		'import/prefer-default-export': 'error',
		// I like the idea, but between not using null and stricter types,
		// I just keep fighting this one over and over. If we disable the no-null
		// rule then we should turn this on.
		'react/require-default-props': 'off',
	},
};
