# @betaorbust/eslint-config

My shared eslint config. Repackaged in the same form factor as
`@rushstack/eslint-config`

This lint config is based around maintainability and allowing others to jump in
and be effective within the codebase as soon as possible. As such, it assumes a
few base technologies are present. Namely:

- Typescript
- Prettier
- Jest is used for unit testing.

## Usage

`.eslintrc.js`

```js
module.exports = {
	extends: ['@betaorbust/eslint-config/profile/node'],
	parserOptions: { tsconfigRootDir: __dirname },
};
```

## Profiles

Available profiles to extend from are:

- `@betaorbust/eslint-config/profile/node`
- `@betaorbust/eslint-config/profile/web-app`
