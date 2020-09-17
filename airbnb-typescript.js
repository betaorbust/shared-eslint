const { rules: baseRules } = require('./airbnb-typescript-base');

module.exports = {
	rules: {
		...baseRules,
		'import/no-default-export': 'off',
		'import/prefer-default-export': 'error',
	},
};
