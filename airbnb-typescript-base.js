const { rules } = require('./airbnb-base');

module.exports = {
	rules: {
		...rules,
		'@typescript-eslint/indent': 'off',
	},
};
