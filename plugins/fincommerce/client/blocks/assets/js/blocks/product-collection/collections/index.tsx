/**
 * External dependencies
 */
import { select } from '@finpress/data';
import { __experimentalRegisterProductCollection as registerProductCollection } from '@fincommerce/blocks-registry';
import {
	// @ts-expect-error Type definition is missing
	store as blocksStore,
	type BlockVariation,
} from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { CollectionName } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';
import blockJson from '@fincommerce/block-library/assets/js/blocks/product-collection/block.json';
import bestSellers from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/best-sellers';
import crossSells from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/cross-sells';
import featured from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/featured';
import handPicked from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/hand-picked';
import newArrivals from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/new-arrivals';
import onSale from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/on-sale';
import productCollection from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/product-collection';
import related from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/related';
import topRated from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/top-rated';
import upsells from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/upsells';
import byCategory from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/by-category';
import byTag from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/by-tag';

// Order in here is reflected in the Collection Chooser in Editor.
const collections: BlockVariation[] = [
	productCollection,
	featured,
	newArrivals,
	onSale,
	bestSellers,
	topRated,
	handPicked,
	byCategory,
	byTag,
	related,
	upsells,
	crossSells,
];

export const registerCollections = () => {
	collections.forEach( ( collection ) =>
		registerProductCollection( collection )
	);
};

export const getCollectionByName = ( collectionName?: CollectionName ) => {
	if ( ! collectionName ) {
		return null;
	}

	// @ts-expect-error Type definitions are missing
	// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/finpress__blocks/store/selectors.d.ts
	const variations = select( blocksStore ).getBlockVariations(
		blockJson.name
	);

	// @ts-expect-error Type definitions are missing
	// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/finpress__blocks/store/selectors.d.ts
	return variations.find( ( { name } ) => name === collectionName );
};

export default registerCollections;
