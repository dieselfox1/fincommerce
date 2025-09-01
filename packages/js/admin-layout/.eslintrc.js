module.exports = {
	extends: [ 'plugin:@fincommerce/eslint-plugin/recommended' ],
	root: true,
	settings: {
		'import/core-modules': [ '@fincommerce/components' ],
		'import/resolver': {
			node: {},
			webpack: {},
			typescript: {},
		},
	},
};
