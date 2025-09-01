module.exports = {
	extends: [ 'plugin:@fincommerce/eslint-plugin/recommended' ],
	root: true,
	overrides: [
		{
			files: [ '**/*.js', '**/*.jsx', '**/*.tsx' ],
			rules: {
				'react/react-in-jsx-scope': 'off',
			},
		},
	],
	settings: {
		'import/core-modules': [
			'@fincommerce/admin-layout',
			'@fincommerce/block-templates',
			'@fincommerce/components',
			'@fincommerce/customer-effort-score',
			'@fincommerce/currency',
			'@fincommerce/data',
			'@fincommerce/experimental',
			'@fincommerce/expression-evaluation',
			'@fincommerce/navigation',
			'@fincommerce/number',
			'@fincommerce/settings',
			'@fincommerce/tracks',
			'@wordpress/blocks',
			'@wordpress/block-editor',
			'@wordpress/components',
			'@wordpress/core-data',
			'@wordpress/date',
			'@wordpress/element',
			'@wordpress/keycodes',
			'@wordpress/media-utils',
			'@testing-library/react',
			'dompurify',
			'react-router-dom',
		],
		'import/resolver': {
			node: {},
			webpack: {},
			typescript: {},
		},
	},
};
