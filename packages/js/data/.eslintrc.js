module.exports = {
	extends: [ 'plugin:@fincommerce/eslint-plugin/recommended' ],
	root: true,
	settings: {
		'import/core-modules': [
			'@fincommerce/date',
			'@fincommerce/navigation',
			'@fincommerce/tracks',
			'@wordpress/api-fetch',
			'@wordpress/core-data',
			'@wordpress/data',
			'@automattic/data-stores',
			'redux',
		],
		'import/resolver': {
			node: {},
			typescript: {},
		},
	},
};
