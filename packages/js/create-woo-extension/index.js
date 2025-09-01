module.exports = {
	templatesPath: __dirname,
	defaultValues: {
		npmDependencies: [
			'@wordpress/hooks',
			'@wordpress/i18n',
			'@fincommerce/components',
		],
		npmDevDependencies: [
			'@fincommerce/dependency-extraction-webpack-plugin',
			'@fincommerce/eslint-plugin',
			'@wordpress/prettier-config',
			'@wordpress/scripts@24.6.0',
		],
		namespace: 'extension',
		license: 'GPL-3.0+',
		customScripts: {
			postinstall: 'composer install',
		},
	},
};
