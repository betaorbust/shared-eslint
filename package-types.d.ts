const EslintConfig: object;
export function makeConfig({
	withJest,
	withTypescript,
	isRoot,
}: {
	withJest: boolean;
	withTypescript: boolean;
	isRoot?: boolean;
}): EslintConfig;
export const updateConfigForTypes: (
	config: EsLintConfig,
	overrideNames: string[],
	overrideUpdate: object
) => EsLintConfig;
declare function getDevelopmentDeps({
	withReact,
	withJest,
	withTypescript,
}: {
	withReact: boolean;
	withJest: boolean;
	withTypescript: boolean;
}): string[];
export declare const supportedTypes: { [supportedType: string]: string };
export { getDevelopmentDeps as getDevDeps };
