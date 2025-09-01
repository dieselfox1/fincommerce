/* eslint-disable no-console */
/**
 * External dependencies
 */
const path = require( 'path' );
const chalk = require( 'chalk' );
const NODE_ENV = process.env.NODE_ENV || 'development';
const CHECK_CIRCULAR_DEPS = process.env.CHECK_CIRCULAR_DEPS || false;
const ASSET_CHECK = process.env.ASSET_CHECK === 'true';

const wcDepMap = {
	'@fincommerce/blocks-registry': [ 'wc', 'wcBlocksRegistry' ],
	'@fincommerce/blocks-checkout-events': [ 'wc', 'blocksCheckoutEvents' ],
	'@fincommerce/settings': [ 'wc', 'wcSettings' ],
	'@fincommerce/block-data': [ 'wc', 'wcBlocksData' ],
	'@fincommerce/data': [ 'wc', 'data' ],
	'@fincommerce/shared-context': [ 'wc', 'wcBlocksSharedContext' ],
	'@fincommerce/shared-hocs': [ 'wc', 'wcBlocksSharedHocs' ],
	'@fincommerce/price-format': [ 'wc', 'priceFormat' ],
	'@fincommerce/blocks-checkout': [ 'wc', 'blocksCheckout' ],
	'@fincommerce/blocks-components': [ 'wc', 'blocksComponents' ],
	'@fincommerce/types': [ 'wc', 'wcTypes' ],
	'@fincommerce/customer-effort-score': [ 'wc', 'customerEffortScore' ],
};

const wcHandleMap = {
	'@fincommerce/blocks-registry': 'wc-blocks-registry',
	'@fincommerce/settings': 'wc-settings',
	'@fincommerce/block-data': 'wc-blocks-data-store',
	'@fincommerce/data': 'wc-store-data',
	'@fincommerce/shared-context': 'wc-blocks-shared-context',
	'@fincommerce/shared-hocs': 'wc-blocks-shared-hocs',
	'@fincommerce/price-format': 'wc-price-format',
	'@fincommerce/blocks-checkout': 'wc-blocks-checkout',
	'@fincommerce/blocks-checkout-events': 'wc-blocks-checkout-events',
	'@fincommerce/blocks-components': 'wc-blocks-components',
	'@fincommerce/types': 'wc-types',
	'@fincommerce/customer-effort-score': 'wc-customer-effort-score',
};

const getAlias = ( options = {} ) => {
	let { pathPart } = options;
	pathPart = pathPart ? `${ pathPart }/` : '';
	return {
		'@fincommerce/atomic-blocks': path.resolve(
			__dirname,
			`../assets/js/${ pathPart }atomic/blocks`
		),
		'@fincommerce/atomic-utils': path.resolve(
			__dirname,
			`../assets/js/${ pathPart }atomic/utils`
		),
		'@fincommerce/base-components': path.resolve(
			__dirname,
			`../assets/js/${ pathPart }base/components/`
		),
		'@fincommerce/base-context': path.resolve(
			__dirname,
			`../assets/js/${ pathPart }base/context/`
		),
		'@fincommerce/base-hocs': path.resolve(
			__dirname,
			`../assets/js/${ pathPart }base/hocs/`
		),
		'@fincommerce/base-hooks': path.resolve(
			__dirname,
			`../assets/js/${ pathPart }base/hooks/`
		),
		'@fincommerce/base-utils': path.resolve(
			__dirname,
			`../assets/js/${ pathPart }base/utils/`
		),
		'@fincommerce/blocks': path.resolve(
			__dirname,
			`../assets/js/${ pathPart }/blocks`
		),
		'@fincommerce/editor-components': path.resolve(
			__dirname,
			`../assets/js/${ pathPart }editor-components/`
		),
		'@fincommerce/block-hocs': path.resolve(
			__dirname,
			`../assets/js/${ pathPart }hocs`
		),
		'@fincommerce/block-settings': path.resolve(
			__dirname,
			'../assets/js/settings/blocks'
		),
		'@fincommerce/icons': path.resolve( __dirname, `../assets/js/icons` ),
		'@fincommerce/resource-previews': path.resolve(
			__dirname,
			`../assets/js/${ pathPart }previews/`
		),
		'@fincommerce/types': path.resolve( __dirname, `../assets/js/types/` ),
		'@fincommerce/utils': path.resolve( __dirname, `../assets/js/utils/` ),
		'@fincommerce/entities': path.resolve(
			__dirname,
			`../assets/js/entities/`
		),
		'react/jsx-dev-runtime': require.resolve( 'react/jsx-dev-runtime' ),
		'react/jsx-runtime': require.resolve( 'react/jsx-runtime' ),
	};
};

const requestToExternal = ( request ) => {
	if ( wcDepMap[ request ] ) {
		return wcDepMap[ request ];
	}
};

const requestToHandle = ( request ) => {
	if ( wcHandleMap[ request ] ) {
		return wcHandleMap[ request ];
	}
};

const getProgressBarPluginConfig = ( name ) => {
	return {
		format:
			chalk.blue( `Building ${ name }` ) +
			' [:bar] ' +
			chalk.green( ':percent' ) +
			' :msg (:elapsed seconds)',
		summary: false,
		customSummary: ( time ) => {
			console.log(
				chalk.green.bold(
					`${ name } assets build completed (${ time })`
				)
			);
		},
	};
};

const getCacheGroups = () => ( {
	'base-components': {
		test: /\/assets\/js\/base\/components\//,
		name( module, chunks, cacheGroupKey ) {
			const moduleFileName = module
				.identifier()
				.split( '/' )
				.reduceRight( ( item ) => item );
			const allChunksNames = chunks
				.map( ( item ) => item.name )
				.join( '~' );
			return `${ cacheGroupKey }-${ allChunksNames }-${ moduleFileName }`;
		},
	},
	'base-context': {
		test: /\/assets\/js\/base\/context\//,
		name( module, chunks, cacheGroupKey ) {
			const moduleFileName = module
				.identifier()
				.split( '/' )
				.reduceRight( ( item ) => item );
			const allChunksNames = chunks
				.map( ( item ) => item.name )
				.join( '~' );
			return `${ cacheGroupKey }-${ allChunksNames }-${ moduleFileName }`;
		},
	},
	'base-hooks': {
		test: /\/assets\/js\/base\/hooks\//,
		name( module, chunks, cacheGroupKey ) {
			const moduleFileName = module
				.identifier()
				.split( '/' )
				.reduceRight( ( item ) => item );
			const allChunksNames = chunks
				.map( ( item ) => item.name )
				.join( '~' );
			return `${ cacheGroupKey }-${ allChunksNames }-${ moduleFileName }`;
		},
	},
	'base-utils': {
		test: /\/assets\/js\/base\/utils\//,
		name( module, chunks, cacheGroupKey ) {
			const moduleFileName = module
				.identifier()
				.split( '/' )
				.reduceRight( ( item ) => item );
			const allChunksNames = chunks
				.map( ( item ) => item.name )
				.join( '~' );
			return `${ cacheGroupKey }-${ allChunksNames }-${ moduleFileName }`;
		},
	},
} );

module.exports = {
	NODE_ENV,
	CHECK_CIRCULAR_DEPS,
	ASSET_CHECK,
	getAlias,
	requestToHandle,
	requestToExternal,
	getProgressBarPluginConfig,
	getCacheGroups,
};
