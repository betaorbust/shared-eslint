const { rules: baseRules } = require('./airbnb-base');

module.exports = {
	rules: {
		...baseRules,
		'import/no-default-export': 'off',
		'import/prefer-default-export': 'off',
	},
};
