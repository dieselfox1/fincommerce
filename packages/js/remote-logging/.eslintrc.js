module.exports = {
	extends: [ 'plugin:@fincommerce/eslint-plugin/recommended' ],
	root: true,
	ignorePatterns: [ '**/test/*.ts', '**/test/*.tsx' ],
	settings: {
		'import/core-modules': [ '@fincommerce/settings' ],
		'import/resolver': {
			node: {},
			typescript: {},
		},
	},
};
