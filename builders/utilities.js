function orderExtensions(orderedExtensions, extensionArray) {
	extensionArray.forEach((extensionName) => {
		if (!orderedExtensions.includes(extensionName)) {
			throw new Error(
				`TRIED TO SORT AN EXTENSION WE DON'T KNOW ABOUT: "${extensionName}"`
			);
		}
	});
	return [...extensionArray].sort((a, b) =>
		orderedExtensions.indexOf(a) < orderedExtensions.indexOf(b) ? -1 : 1
	);
}
function cheapClone(someObject) {
	return JSON.parse(JSON.stringify(someObject));
}

module.exports = { orderExtensions, cheapClone };
