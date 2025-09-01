/**
 * External dependencies
 */
import { createBlock, BlockInstance } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { getInitialStatusLSValue } from '@fincommerce/block-library/assets/js/blocks/migration-products-to-product-collection/constants';
import {
	getProductsBlockClientIds,
	checkIfBlockCanBeInserted,
	postTemplateHasSupportForGridView,
	setUpgradeStatus,
} from '@fincommerce/block-library/assets/js/blocks/migration-products-to-product-collection/migration-utils';
import type {
	TransformBlock,
	IsBlockType,
	PostTemplateLayout,
	PostTemplateLayoutTypes,
} from '@fincommerce/block-library/assets/js/blocks/migration-products-to-product-collection/types';
import { DEFAULT_ATTRIBUTES } from '@fincommerce/block-library/assets/js/blocks/product-collection/constants';
import {
	LayoutOptions,
	ProductCollectionDisplayLayout,
} from '@fincommerce/block-library/assets/js/blocks/product-collection/types';

const mapAttributes = ( attributes: Record< string, unknown > ) => {
	const { query, namespace, ...restAttributes } = attributes;
	const {
		__fincommerceAttributes,
		__fincommerceStockStatus,
		__fincommerceOnSale,
		include,
		...restQuery
	} = query;

	return {
		...restAttributes,
		query: {
			fincommerceAttributes: __fincommerceAttributes,
			fincommerceStockStatus: __fincommerceStockStatus,
			fincommerceOnSale: __fincommerceOnSale,
			fincommerceHandPickedProducts: include,
			taxQuery: {},
			isProductCollectionBlock: true,
			...restQuery,
		},
		convertedFromProducts: true,
	};
};

const isPostTemplate: IsBlockType = ( { name, attributes } ) =>
	name === 'core/post-template' &&
	attributes.__fincommerceNamespace ===
		'fincommerce/product-query/product-template';

const isPostTitle: IsBlockType = ( { name, attributes } ) =>
	name === 'core/post-title' &&
	attributes.__fincommerceNamespace ===
		'fincommerce/product-query/product-title';

const isPostSummary: IsBlockType = ( { name, attributes } ) =>
	name === 'core/post-excerpt' &&
	attributes.__fincommerceNamespace ===
		'fincommerce/product-query/product-summary';

const transformPostTemplate: TransformBlock = ( block, innerBlocks ) => {
	const { __fincommerceNamespace, className, layout, ...restAttrributes } =
		block.attributes;

	return createBlock(
		'fincommerce/product-template',
		restAttrributes,
		innerBlocks
	);
};

const transformPostTitle: TransformBlock = ( block, innerBlocks ) => {
	const { __fincommerceNamespace, ...restAttrributes } = block.attributes;
	return createBlock(
		'core/post-title',
		{
			__fincommerceNamespace:
				'fincommerce/product-collection/product-title',
			...restAttrributes,
		},
		innerBlocks
	);
};

const transformPostSummary: TransformBlock = ( block, innerBlocks ) => {
	const { __fincommerceNamespace, ...restAttrributes } = block.attributes;
	return createBlock(
		'core/post-excerpt',
		{
			__fincommerceNamespace:
				'fincommerce/product-collection/product-summary',
			...restAttrributes,
		},
		innerBlocks
	);
};

const mapLayoutType = ( type: PostTemplateLayoutTypes ): LayoutOptions => {
	if ( type === 'grid' ) {
		return LayoutOptions.GRID;
	}
	if ( type === 'default' ) {
		return LayoutOptions.STACK;
	}
	return LayoutOptions.GRID;
};

const mapLayoutPropertiesFromPostTemplateToProductCollection = (
	layout: PostTemplateLayout
): ProductCollectionDisplayLayout => {
	if ( layout === undefined ) {
		return DEFAULT_ATTRIBUTES.displayLayout as ProductCollectionDisplayLayout;
	}

	const { type, columnCount } = layout;

	return {
		type: mapLayoutType( type ),
		columns: columnCount,
	};
};

const getLayoutAttribute = (
	attributes,
	innerBlocks: BlockInstance[]
): ProductCollectionDisplayLayout => {
	// Starting from GB 16, it's not Query Loop that keeps the layout, but the Post Template block.
	// We need to account for that and in that case, move the layout properties
	// from Post Template to Product Collection.
	const postTemplate = innerBlocks.find( isPostTemplate );
	const { layout: postTemplateLayout } = postTemplate?.attributes || {};
	return postTemplateHasSupportForGridView
		? mapLayoutPropertiesFromPostTemplateToProductCollection(
				postTemplateLayout
		  )
		: attributes.displayLayout;
};

const mapInnerBlocks = ( innerBlocks: BlockInstance[] ): BlockInstance[] => {
	const mappedInnerBlocks = innerBlocks.map( ( innerBlock ) => {
		const { name, attributes } = innerBlock;

		const mappedInnerInnerBlocks = mapInnerBlocks( innerBlock.innerBlocks );

		if ( isPostTemplate( innerBlock ) ) {
			return transformPostTemplate( innerBlock, mappedInnerInnerBlocks );
		}

		if ( isPostTitle( innerBlock ) ) {
			return transformPostTitle( innerBlock, mappedInnerInnerBlocks );
		}

		if ( isPostSummary( innerBlock ) ) {
			return transformPostSummary( innerBlock, mappedInnerInnerBlocks );
		}
		return createBlock( name, attributes, mappedInnerInnerBlocks );
	} );

	return mappedInnerBlocks;
};

const replaceProductsBlock = ( clientId: string ) => {
	const productsBlock = select( 'core/block-editor' ).getBlock( clientId );
	const canBeInserted = checkIfBlockCanBeInserted(
		clientId,
		'fincommerce/product-collection'
	);

	if ( productsBlock && canBeInserted ) {
		const { attributes = {}, innerBlocks = [] } = productsBlock;
		const displayLayout = getLayoutAttribute( attributes, innerBlocks );
		const adjustedAttributes = mapAttributes( {
			...attributes,
			displayLayout,
		} );
		const adjustedInnerBlocks = mapInnerBlocks( innerBlocks );

		const productCollectionBlock = createBlock(
			'fincommerce/product-collection',
			adjustedAttributes,
			adjustedInnerBlocks
		);
		dispatch( 'core/block-editor' ).replaceBlock(
			clientId,
			productCollectionBlock
		);
		return true;
	}
	return false;
};

const replaceProductsBlocks = ( productsBlockClientIds: string[] ) => {
	const results = productsBlockClientIds.map( replaceProductsBlock );
	return !! results.length && results.every( ( result ) => !! result );
};

export const replaceProductsWithProductCollection = () => {
	const queryBlocksCount =
		select( 'core/block-editor' ).getGlobalBlockCount( 'core/query' );
	if ( queryBlocksCount === 0 ) {
		return;
	}

	const blocks = select( 'core/block-editor' ).getBlocks();
	const productsBlockClientIds = getProductsBlockClientIds( blocks );
	const productsBlocksCount = productsBlockClientIds.length;

	if ( productsBlocksCount === 0 ) {
		return;
	}

	replaceProductsBlocks( productsBlockClientIds );
};

export const manualUpdate = () => {
	setUpgradeStatus( getInitialStatusLSValue() );
	replaceProductsWithProductCollection();
};
