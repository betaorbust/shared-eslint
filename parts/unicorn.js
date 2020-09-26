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
		// Prettier is just flat wrong here. Made the incorrect decision
		// and won't go back. So we have to skip this.
		// https://github.com/prettier/prettier/issues/5158
		'unicorn/number-literal-case': 'off',
	},
};