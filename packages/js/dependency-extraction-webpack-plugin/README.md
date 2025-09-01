# Dependency Extraction Webpack Plugin

Extends Wordpress [Dependency Extraction Webpack Plugin](https://github.com/WordPress/gutenberg/tree/trunk/packages/dependency-extraction-webpack-plugin) to automatically include FinCommerce dependencies in addition to WordPress dependencies.

## Installation

Install the module

```bash
pnpm install @fincommerce/dependency-extraction-webpack-plugin --save-dev
```

## Usage

Use this as you would [Dependency Extraction Webpack Plugin](https://github.com/WordPress/gutenberg/tree/trunk/packages/dependency-extraction-webpack-plugin). The API is exactly the same, except that FinCommerce packages are also handled automatically.

```js
// webpack.config.js
const fincommerceDependencyExtractionWebpackPlugin = require( '@fincommerce/dependency-extraction-webpack-plugin' );

module.exports = {
 // …snip
 plugins: [ new fincommerceDependencyExtractionWebpackPlugin() ],
};
```

**Note:** If you plan to extend the webpack configuration from `@wordpress/scripts` with `fincommerceDependencyExtractionWebpackPlugin`, be sure to remove the default instance of the plugin:

```js
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const webpackConfig = {
	...defaultConfig,
	plugins: [
		...defaultConfig.plugins.filter(
			( plugin ) =>
				plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
		),
		new fincommerceDependencyExtractionWebpackPlugin(),
	],
};
```

Additional module requests on top of Wordpress [Dependency Extraction Webpack Plugin](https://github.com/WordPress/gutenberg/tree/trunk/packages/dependency-extraction-webpack-plugin) are:

| Request                        | Global                   | Script handle          | Notes                                                   |
| ------------------------------ | ------------------------ | ---------------------- | --------------------------------------------------------|
| `@fincommerce/data`            | `wc['data']`             | `wc-store-data`        | |
| `@fincommerce/csv-export`      | `wc['csvExport']`        | `wc-csv`               | |
| `@fincommerce/blocks-registry` | `wc['wcBlocksRegistry']` | `wc-blocks-registry`   | |
| `@fincommerce/block-data`      | `wc['wcBlocksData']`     | `wc-blocks-data-store` | This dependency does not have an associated npm package |
| `@fincommerce/settings`        | `wc['wcSettings']`       | `wc-settings`          | |
| `@fincommerce/*`               | `wc['*']`                | `wc-*`                 | |

### Options

An object can be passed to the constructor to customize the behavior, for example:

```js
module.exports = {
 plugins: [
  new fincommerceDependencyExtractionWebpackPlugin( {
   bundledPackages: [ '@fincommerce/components' ],
  } ),
 ],
};
```

#### `bundledPackages`

- Type: array
- Default: []

A list of potential FinCommerce excluded packages, this will include the excluded package within the bundle (example above).

For more supported options see the original [dependency extraction plugin](https://github.com/WordPress/gutenberg/blob/trunk/packages/dependency-extraction-webpack-plugin/README.md#options).
