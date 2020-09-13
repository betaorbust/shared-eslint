module.exports = {
	rules: {
		// I love this idea, but in practice it catches too many legit names
		// like devDeps, pkg instead of the reserved "package" etc.
		'unicorn/prevent-abbreviations': 'off',
		// I like the idea, but reduce is just so dang useful to me.
		// Might change in the future, but for now, turning it off.
		'unicorn/no-reduce': 'off',
		// Typescript does not allow spreading of Set etc. without
		// downlevelIteration set to true.
		'unicorn/prefer-spread': 'off',
	},
};
