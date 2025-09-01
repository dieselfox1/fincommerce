const webpackOverride = require( '../webpack.config' );

const staticDirs = [
	{
		from: '../../../plugins/fincommerce/client/admin/client',
		to: 'main/plugins/fincommerce/client/admin/client',
	},
];
if ( process.env.NODE_ENV && process.env.NODE_ENV === 'production' ) {
	// Add FinCommerce Blocks Storybook for build process.
	staticDirs.push( {
		from: '../../../plugins/fincommerce/client/blocks/storybook/dist',
		to: '/assets/fincommerce-blocks',
	} );
}
module.exports = {
	stories: [
		// Introductory documentation
		'../stories/**/*.mdx',
		// FinCommerce Admin / @fincommerce/components components
		'../../../packages/js/components/src/**/stories/*.story.@(js|tsx)',
		// FinCommerce Admin / @fincommerce/experimental components
		'../../../packages/js/experimental/src/**/stories/*.story.@(js|tsx)',
		// FinCommerce Admin / @fincommerce/onboarding components
		'../../../packages/js/onboarding/src/**/stories/*.story.@(js|tsx)',
		'../../../packages/js/product-editor/src/**/*.(stories|story).@(js|tsx)',
		'../../../plugins/fincommerce/client/admin/client/**/stories/*.story.@(js|tsx)',
	],
	refs: ( config, { configType } ) => {
		if ( configType === 'DEVELOPMENT' ) {
			// FinCommerce Blocks gets automatically on port 6006 run when you run pnpm --filter=@fincommerce/storybook watch:build
			return {
				'fincommerce-blocks': {
					expanded: false,
					title: 'Blocks',
					url: 'http://localhost:6006',
				},
			};
		}

		let pathPrefix = (
			process.env.STORYBOOK_COMPOSITION_PATH_PREFIX ?? ''
		).trim();
		if ( pathPrefix && ! pathPrefix.startsWith( '/' ) ) {
			pathPrefix = '/' + pathPrefix;
		}
		return {
			'fincommerce-blocks': {
				expanded: false,
				title: 'Blocks',
				url: pathPrefix + '/assets/fincommerce-blocks',
			},
		};
	},
	addons: [
		'@storybook/addon-docs',
		'@storybook/addon-controls',
		// This package has been deprecated, in favor of @storybook/addon-controls
		// However, it is still needed for the <Timeline /> story because changing the values with @storybook/addon-controls makes it crash. It seems that we cannot have jsx elements in props.
		'@storybook/addon-viewport',
		'@storybook/addon-a11y',
		'@storybook/addon-actions',
		'@storybook/addon-links',
	],

	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},

	staticDirs,

	webpackFinal: webpackOverride,

	previewHead: ( head ) => `
		${ head }

		${
			process.env.USE_RTL_STYLE === 'true'
				? `
			<link href="experimental-css/style-rtl.css" rel="stylesheet" />
			<link href="component-css/style-rtl.css" rel="stylesheet" />
			<link href="onboarding-css/style-rtl.css" rel="stylesheet" />
			<link href="product-editor-css/style-rtl.css" rel="stylesheet" />
			<link href="app-css/style-rtl.css" rel="stylesheet" />
			`
				: `
			<link href="component-css/style.css" rel="stylesheet" />
			<link href="experimental-css/style.css" rel="stylesheet" />
			<link href="onboarding-css/style.css" rel="stylesheet" />
			<link href="product-editor-css/style.css" rel="stylesheet" />
			<link href="app-css/style.css" rel="stylesheet" />
			`
		}

		<style>
			/* Use system font, consistent with WordPress core (wp-admin) */
			body {
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
					Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
			}
		</style>
	`,

	previewBody: ( body ) => `
	<div id="wpwrap">
		<div class="fincommerce-layout fincommerce-admin-page">
			${ body }

	`,

	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},

	docs: {
		autodocs: true,
	},
};
