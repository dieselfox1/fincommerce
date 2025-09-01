module.exports = {
	extends: [ 'plugin:@fincommerce/eslint-plugin/recommended' ],
	root: true,
	settings: {
		'import/core-modules': [
			'@fincommerce/number',
			'@fincommerce/settings',
		],
		'import/resolver': {
			node: {},
			typescript: {},
		},
	},
};
