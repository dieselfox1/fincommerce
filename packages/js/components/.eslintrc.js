module.exports = {
	extends: [ 'plugin:@fincommerce/eslint-plugin/recommended' ],
	root: true,
	ignorePatterns: [ '**/test/*.ts', '**/test/*.tsx' ],
	overrides: [
		{
			files: [
				'**/stories/*.js',
				'**/stories/*.jsx',
				'**/docs/example.js',
			],
			rules: {
				'import/no-unresolved': [
					'warn',
					{ ignore: [ '@fincommerce/components' ] },
				],
			},
		},
	],
	settings: {
		'import/core-modules': [
			'@fincommerce/components',
			'@fincommerce/currency',
			'@fincommerce/data',
			'@fincommerce/date',
			'@fincommerce/navigation',
			'@storybook/react',
			'@automattic/tour-kit',
			'@wordpress/blocks',
			'@wordpress/components',
			'@wordpress/element',
			'@wordpress/media-utils',
			'dompurify',
			'downshift',
			'moment',
		],
		'import/resolver': {
			node: {},
			webpack: {},
			typescript: {},
		},
	},
};
