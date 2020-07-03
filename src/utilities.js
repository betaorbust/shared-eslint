const deepMerge = require('deepmerge');

const SUPPORTED_TYPES = {
	js: ['*.js'],
	jsx: ['*.jsx'],
	ts: ['*.ts'],
	tsx: ['*.tsx'],
	jestJs: ['*.test.js'],
	jestTs: ['*.test.ts'],
};

function cheapArrayEquals(array1, array2) {
	return JSON.stringify(array1) === JSON.stringify(array2);
}

function deepCloneConfig(config) {
	return JSON.parse(JSON.stringify(config));
}

function getOverride(config, overrideName) {
	if (!SUPPORTED_TYPES[overrideName]) {
		throw new Error(
			`Got an override name that does not exist: "${overrideName}". Acceptable names: ["${Object.keys(
				SUPPORTED_TYPES
			).join('", "')}"]`
		);
	}
	const result = config.overrides.find((override) => {
		return cheapArrayEquals(override.files, SUPPORTED_TYPES[overrideName]);
	});

	if (!result) {
		throw new Error(
			`Attempted to override "${overrideName}", but could not find an existing override.`
		);
	}
	return result;
}

function updateOverride(config, overrideName, newOverride) {
	const newConfig = deepCloneConfig(config);
	if (!SUPPORTED_TYPES[overrideName]) {
		throw new Error(
			`Got an override name that does not exist: "${overrideName}". Acceptable names: ["${Object.keys(
				SUPPORTED_TYPES
			).join('", "')}"]`
		);
	}
	const oldOverride = getOverride(newConfig, overrideName);
	const index = newConfig.overrides.indexOf(oldOverride);
	if (index === -1) {
		throw new Error(`Couldn't find index of override`);
	}

	newConfig.overrides[index] = newOverride;
	return newConfig;
}

function updateConfigForTypes(config, overrideNames, overrideUpdate) {
	let newConfig = deepCloneConfig(config);
	overrideNames.forEach((overrideName) => {
		const override = getOverride(newConfig, overrideName);
		const newOverride = deepMerge(override, overrideUpdate);
		newConfig = updateOverride(newConfig, overrideName, newOverride);
	});
	return newConfig;
}

module.exports = {
	updateConfigForTypes,
	SUPPORTED_TYPES,
};
