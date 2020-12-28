require('@rushstack/eslint-patch/modern-module-resolution');
const { common, APP_TYPES } = require('./_common');

module.exports = common(APP_TYPES.node);
