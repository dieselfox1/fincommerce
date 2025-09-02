/**
 * External dependencies
 */
const { join } = require( 'path' );

module.exports = {
	defaultValues: {
		namespace: 'extension',
		slug: 'example-product-editor-block',
		version: '0.1.0',
		category: 'widgets',
		title: 'Example Product Editor Block',
		description: 'A block to demonstrate extending the Product Editor',
		dashicon: 'flag',
		license: 'GPL-3.0+',
		attributes: {
			message: {
				type: 'string',
				role: 'content',
				source: 'text',
				selector: 'div',
			},
		},
		supports: {
			html: false,
			inserter: false,
		},
		npmDevDependencies: [
			'@types/finpress__block-editor@^7.0.0',
			'@types/finpress__blocks@^11.0.9',
			'@fincommerce/dependency-extraction-webpack-plugin',
			'@fincommerce/eslint-plugin',
			'@finpress/prettier-config',
			'@finpress/stylelint-config',
			'eslint-import-resolver-typescript',
			'@fincommerce/product-editor',
			'ajv-keywords@^3.5.2', // Adding ajv-keywords to fix a dependency issue caused by legacy-peer-deps = true.
		],
		customScripts: {
			postinstall: 'composer install',
		},
		wpScripts: true,
		wpEnv: true,
		editorScript: 'file:./index.js',
		editorStyle: 'file:./index.css',
	},
	pluginTemplatesPath: join( __dirname, 'plugin-templates' ),
	blockTemplatesPath: join( __dirname, 'block-templates' ),
};
