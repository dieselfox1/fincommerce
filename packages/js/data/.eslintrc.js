module.exports = {
	extends: [ 'plugin:@fincommerce/eslint-plugin/recommended' ],
	root: true,
	settings: {
		'import/core-modules': [
			'@fincommerce/date',
			'@fincommerce/navigation',
			'@fincommerce/tracks',
			'@finpress/api-fetch',
			'@finpress/core-data',
			'@finpress/data',
			'@automattic/data-stores',
			'redux',
		],
		'import/resolver': {
			node: {},
			typescript: {},
		},
	},
};
