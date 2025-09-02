module.exports = {
	extends: [ 'plugin:@fincommerce/eslint-plugin/recommended' ],
	overrides: [
		{
			files: [
				'src/**/*.js',
				'src/**/*.ts',
				'src/**/*.jsx',
				'src/**/*.tsx',
			],
			rules: {
				'react/react-in-jsx-scope': 'off',
				'@finpress/no-unsafe-wp-apis': 'off',
				'@finpress/i18n-text-domain': [
					'error',
					{
						allowedTextDomain: [ 'fincommerce' ],
					},
				],
			},
		},
	],
	settings: {
		'import/core-modules': [
			'@finpress/blocks',
			'@finpress/block-editor',
			'@finpress/components',
			'@finpress/core-data',
			'@finpress/date',
			'@finpress/data',
			'@finpress/data-controls',
			'@finpress/editor',
			'@finpress/element',
			'@finpress/keycodes',
			'@finpress/media-utils',
			'@finpress/notices',
			'@finpress/hooks',
			'@finpress/preferences',
		],
		'import/resolver': {
			node: {},
			webpack: {},
			typescript: {},
		},
	},
};
