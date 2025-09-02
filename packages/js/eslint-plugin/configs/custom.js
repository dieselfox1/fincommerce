module.exports = {
	plugins: [ '@finpress', '@fincommerce' ],
	rules: {
		'@fincommerce/dependency-group': 'error',
	},
	settings: {
		jsdoc: {
			mode: 'typescript',
		},
	},
	overrides: [
		{
			files: [
				'**/@(test|__tests__)/**/*.js',
				'**/?(*.)test.js',
				'**/tests/**/*.js',
			],
			extends: [
				'plugin:@finpress/eslint-plugin/test-unit',
				require.resolve( './react-testing-library' ),
			],
		},
	],
};
