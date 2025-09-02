/**
 * External dependencies
 */
import { registerCoreBlocks } from '@finpress/block-library';

/**
 * Internal dependencies
 */
import { createCrossSellsProductCollection } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-cross-sells-block';
import crossSells from '@fincommerce/block-library/assets/js/blocks/product-collection/collections/cross-sells';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sale-badge';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/price';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/button';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/title';
import '@fincommerce/block-library/assets/js/blocks/product-template';
import '@fincommerce/block-library/assets/js/blocks/product-collection';

// Register core blocks and FinCommerce blocks needed for the test
beforeAll( () => {
	registerCoreBlocks();
} );

describe( 'createCrossSellsProductCollection transform function', () => {
	it( 'transforms to product-collection block with cross-sells attributes', () => {
		const transformedBlock = createCrossSellsProductCollection();

		// Test block type and collection identifier
		expect( transformedBlock.name ).toBe(
			'fincommerce/product-collection'
		);
		expect( transformedBlock.attributes.collection ).toBe(
			'fincommerce/product-collection/cross-sells'
		);

		// Test that cross-sells attributes are preserved exactly
		expect( transformedBlock.attributes.displayLayout ).toEqual( {
			...crossSells.attributes.displayLayout,
			columns: 3,
		} );
		expect( transformedBlock.attributes.query ).toEqual( {
			...crossSells.attributes.query,
			perPage: 3,
		} );
		expect( transformedBlock.attributes.hideControls ).toEqual(
			crossSells.attributes.hideControls
		);
	} );

	it( 'creates inner blocks from cross-sells template', () => {
		const transformedBlock = createCrossSellsProductCollection();

		expect( transformedBlock.innerBlocks.length ).toBeGreaterThan( 0 );

		const headingBlocks = transformedBlock.innerBlocks.filter(
			( block ) => block.name === 'core/heading'
		);
		expect( headingBlocks.length ).toBeGreaterThan( 0 );
		expect( headingBlocks[ 0 ].attributes.level ).toBe( 2 );
		expect( headingBlocks[ 0 ].attributes.content ).toBeDefined();
		expect( headingBlocks[ 0 ].attributes.textAlign ).toBe( 'left' );
	} );
} );
