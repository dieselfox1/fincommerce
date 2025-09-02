module.exports = {
	extends: [ 'plugin:@fincommerce/eslint-plugin/recommended' ],
	root: true,
	settings: {
		'import/core-modules': [
			'@fincommerce/components',
			'@finpress/components',
			'@storybook/react',
			'react-transition-group/CSSTransition',
			'dompurify',
		],
		'import/resolver': {
			node: {},
			webpack: {},
			typescript: {},
		},
	},
};
