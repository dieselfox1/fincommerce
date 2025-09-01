module.exports = {
	extends: [ 'plugin:@fincommerce/eslint-plugin/recommended' ],
	root: true,
	settings: {
		'import/core-modules': [
			'@fincommerce/data',
			'@fincommerce/experimental',
			'@fincommerce/navigation',
			'@fincommerce/tracks',
			'@testing-library/react',
		],
		'import/resolver': {
			node: {},
			webpack: {},
			typescript: {},
		},
	},
};
