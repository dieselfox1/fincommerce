/**
 * External dependencies
 */
import type { BlockAttributes } from '@wordpress/blocks';
import '@testing-library/jest-dom';
import { act, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */

import '@fincommerce/block-library/assets/js/blocks/classic-shortcode';
import '@fincommerce/block-library/assets/js/blocks/cart';
import '@fincommerce/block-library/assets/js/blocks/checkout';
import '@fincommerce/block-library/assets/js/blocks/product-new';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sale-badge';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/price';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/button';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/title';
import '@fincommerce/block-library/assets/js/blocks/product-template';
import '@fincommerce/block-library/assets/js/blocks/product-collection';
import { initializeEditor } from '@fincommerce/block-library/tests/integration/helpers/integration-test-editor';

async function setup( attributes: BlockAttributes ) {
	const testBlock = [ { name: 'fincommerce/classic-shortcode', attributes } ];
	return initializeEditor( testBlock );
}

describe( 'Classic Shortcode block', () => {
	test( 'can convert to Cart block', async () => {
		await setup( { shortcode: 'cart' } );

		const transformButton = screen.getByRole( 'button', {
			name: /Transform into blocks/i,
		} );
		await act( async () => {
			await transformButton.click();
		} );

		expect( screen.getByLabelText( /^Block: Cart$/i ) ).toBeInTheDocument();
	} );
	test( 'can convert to Checkout block', async () => {
		await setup( { shortcode: 'checkout' } );

		const transformButton = screen.getByRole( 'button', {
			name: /Transform into blocks/i,
		} );
		await act( async () => {
			await transformButton.click();
		} );

		expect(
			screen.getByLabelText( /^Block: Checkout$/i )
		).toBeInTheDocument();
	} );
} );
