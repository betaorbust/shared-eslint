declare function getDevelopmentDeps({
	withJavascript,
	withReact,
	withTypescript,
	withReactTypescript,
	withJest,
	withJestTypescript,
}: {
	withJavascript: boolean;
	withReact: boolean;
	withTypescript: boolean;
	withReactTypescript: boolean;
	withJest: boolean;
	withJestTypescript: boolean;
}): string[];
export { getDevelopmentDeps as getDevDeps };
