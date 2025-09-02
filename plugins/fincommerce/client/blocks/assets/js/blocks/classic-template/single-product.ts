/**
 * External dependencies
 */
import { __, sprintf } from '@finpress/i18n';
import { VARIATION_NAME as PRODUCT_TITLE_VARIATION_NAME } from '@fincommerce/blocks/product-query/variations/elements/product-title';
import {
	INNER_BLOCKS_PRODUCT_TEMPLATE as productCollectionInnerBlocksTemplate,
	DEFAULT_ATTRIBUTES as productCollectionDefaultAttributes,
	DEFAULT_QUERY as productCollectionDefaultQuery,
} from '@fincommerce/blocks/product-collection/constants';
import {
	BlockInstance,
	createBlock,
	// @ts-expect-error Type definitions for this function are missing in Gutenberg
	createBlocksFromInnerBlocksTemplate,
} from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { OnClickCallbackParameter } from '@fincommerce/block-library/assets/js/blocks/classic-template/types';

const getBlockifiedTemplate = () =>
	[
		createBlock( 'fincommerce/breadcrumbs' ),
		createBlock( 'fincommerce/store-notices' ),
		createBlock(
			'core/columns',
			{
				align: 'wide',
			},
			[
				createBlock(
					'core/column',
					{
						type: 'constrained',
						justifyContent: 'right',
						width: '512px',
					},
					[ createBlock( 'fincommerce/product-image-gallery' ) ]
				),
				createBlock( 'core/column', {}, [
					createBlock( 'core/post-title', {
						__fincommerceNamespace: PRODUCT_TITLE_VARIATION_NAME,
						level: 1,
					} ),
					createBlock( 'fincommerce/product-rating' ),
					createBlock( 'fincommerce/product-price', {
						fontSize: 'large',
					} ),
					createBlock( 'fincommerce/product-summary', {
						isDescendentOfSingleProductTemplate: true,
					} ),
					createBlock( 'fincommerce/add-to-cart-form' ),
					createBlock( 'fincommerce/product-meta' ),
				] ),
			]
		),
		createBlock( 'fincommerce/product-details', {
			align: 'wide',
			className: 'is-style-minimal',
		} ),
		createBlock( 'core/heading', {
			align: 'wide',
			level: 2,
			content: __( 'Related Products', 'fincommerce' ),
			style: { spacing: { margin: { bottom: '1rem' } } },
		} ),
		createBlock(
			'fincommerce/product-collection',
			{
				...productCollectionDefaultAttributes,
				query: {
					...productCollectionDefaultQuery,
					perPage: 5,
					pages: 1,
					fincommerceStockStatus: [ 'instock', 'onbackorder' ],
					filterable: false,
				},
				displayLayout: {
					type: 'flex',
					columns: 5,
					shrinkColumns: true,
				},
				collection: 'fincommerce/product-collection/related',
				hideControls: [ 'inherit' ],
				align: 'wide',
			},
			createBlocksFromInnerBlocksTemplate( [
				productCollectionInnerBlocksTemplate,
			] )
		),
	].filter( Boolean ) as BlockInstance[];

const getDescription = ( templateTitle: string ) =>
	sprintf(
		/* translators: %s is the template title */
		__(
			'Transform this template into multiple blocks so you can add, remove, reorder, and customize your %s template.',
			'fincommerce'
		),
		templateTitle
	);

const getButtonLabel = () => __( 'Transform into blocks', 'fincommerce' );

const onClickCallback = ( {
	clientId,
	getBlocks,
	replaceBlock,
	selectBlock,
}: OnClickCallbackParameter ) => {
	replaceBlock( clientId, getBlockifiedTemplate() );

	const blocks = getBlocks();
	const groupBlock = blocks.find(
		( block ) =>
			block.name === 'core/group' &&
			block.innerBlocks.some(
				( innerBlock ) => innerBlock.name === 'fincommerce/breadcrumbs'
			)
	);

	if ( groupBlock ) {
		selectBlock( groupBlock.clientId );
	}
};

const blockifyConfig = {
	getButtonLabel,
	onClickCallback,
	getBlockifiedTemplate,
};

export { getDescription, blockifyConfig };
