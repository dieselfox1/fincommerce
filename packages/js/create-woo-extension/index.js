module.exports = {
	templatesPath: __dirname,
	defaultValues: {
		npmDependencies: [
			'@finpress/hooks',
			'@finpress/i18n',
			'@fincommerce/components',
		],
		npmDevDependencies: [
			'@fincommerce/dependency-extraction-webpack-plugin',
			'@fincommerce/eslint-plugin',
			'@finpress/prettier-config',
			'@finpress/scripts@24.6.0',
		],
		namespace: 'extension',
		license: 'GPL-3.0+',
		customScripts: {
			postinstall: 'composer install',
		},
	},
};
