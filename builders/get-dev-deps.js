const configs = require('./configs');

function getDevDeps({
	withJavascript,
	withReact,
	withTypescript,
	withReactTypescript,
	withJest,
	withJestTypescript,
}) {
	const devDeps = [
		[withJavascript, configs.javascript],
		[withReact, configs.react],
		[withTypescript, configs.typescript],
		[withReactTypescript, configs.reactTypescript],
		[withJest, configs.jest],
		[withJestTypescript, configs.jestTypescript],
	]
		.filter(([enabled]) => !!enabled)
		.map(([, config]) => config.devDeps)
		.flat(2);
	// Unique everything
	return [...new Set(devDeps)];
}

module.exports = getDevDeps;
