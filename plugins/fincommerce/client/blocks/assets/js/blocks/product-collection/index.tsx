/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-collection/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/product-collection/edit';
import save from '@fincommerce/block-library/assets/js/blocks/product-collection/save';
import icon from '@fincommerce/block-library/assets/js/blocks/product-collection/icon';
import registerProductSummaryVariation from '@fincommerce/block-library/assets/js/blocks/product-collection/variations/elements/product-summary';
import registerProductTitleVariation from '@fincommerce/block-library/assets/js/blocks/product-collection/variations/elements/product-title';
import registerCollections from '@fincommerce/block-library/assets/js/blocks/product-collection/collections';
import { addProductCollectionToQueryPaginationParentOrAncestor } from '@fincommerce/block-library/assets/js/blocks/product-collection/utils';

registerBlockType( metadata, {
	icon,
	edit,
	save,
} );
registerProductSummaryVariation();
registerProductTitleVariation();
registerCollections();
addProductCollectionToQueryPaginationParentOrAncestor();
