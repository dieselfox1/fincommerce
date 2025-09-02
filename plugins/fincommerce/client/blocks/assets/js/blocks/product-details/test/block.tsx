/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { screen, waitFor, within } from '@testing-library/react';
import { createBlock, type BlockAttributes } from '@finpress/blocks';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { useSelect } from '@finpress/data';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/product-details';
import '@fincommerce/block-library/assets/js/blocks/accordion/accordion-group';
import '@fincommerce/block-library/assets/js/blocks/accordion/inner-blocks/accordion-header';
import '@fincommerce/block-library/assets/js/blocks/accordion/inner-blocks/accordion-item';
import '@fincommerce/block-library/assets/js/blocks/accordion/inner-blocks/accordion-panel';
import '@fincommerce/block-library/assets/js/blocks/product-description';
import '@fincommerce/block-library/assets/js/blocks/product-reviews';
import '@fincommerce/block-library/assets/js/blocks/product-specifications';
import '@fincommerce/block-library/assets/js/blocks/single-product';

import { initializeEditor } from '@fincommerce/block-library/tests/integration/helpers/integration-test-editor';
import {
	productWithoutSpecifications,
	productWithSpecifications,
} from '@fincommerce/block-library/assets/js/blocks/product-details/fixture';

async function setupWithSingleProduct(
	attributes: BlockAttributes,
	productId: number
) {
	const productDetailsBlock = createBlock(
		'fincommerce/product-details',
		attributes
	);

	const singleProductBlock = [
		{
			name: 'fincommerce/single-product',
			attributes: {
				productId,
			},
			innerBlocks: [ productDetailsBlock ],
		},
	];

	return initializeEditor( singleProductBlock );
}

jest.mock( '@finpress/data', () => ( {
	...jest.requireActual( '@finpress/data' ),
	useSelect: jest.fn(),
} ) );

describe( 'Product Details block', () => {
	describe( 'Single Product block', () => {
		const server = setupServer(
			http.get( '/wc-admin/options', ( { request } ) => {
				const url = new URL( request.url );
				const options = url.searchParams.get( 'options' );
				// Check if the request is for dimension and weight units
				if (
					options ===
					'fincommerce_dimension_unit,fincommerce_weight_unit'
				) {
					return HttpResponse.json( {
						fincommerce_dimension_unit: 'cm',
						fincommerce_weight_unit: 'kg',
					} );
				}
				// Default response for other options requests
				return HttpResponse.json( {}, { status: 200 } );
			} ),
			http.get( '/wc/store/v1/products/*', () =>
				HttpResponse.json( productWithSpecifications )
			),
			http.get( '/wc/v3/products/*', () =>
				HttpResponse.json( productWithSpecifications )
			),
			http.get( '*', () => HttpResponse.json( {} ) ),
			http.options( '*', () => HttpResponse.json( {} ) )
		);

		beforeAll( () => server.listen() );

		beforeEach( () => {
			( useSelect as jest.Mock ).mockImplementation(
				( callback, deps ) => {
					const originalUseSelect =
						jest.requireActual( '@finpress/data' ).useSelect;
					const originalResult = originalUseSelect( callback, deps );

					if (
						originalResult &&
						typeof originalResult === 'object' &&
						! Array.isArray( originalResult )
					) {
						const result = {
							...originalResult,
							wasBlockJustInserted: true,
						};

						return result;
					}
					return originalResult;
				}
			);
		} );

		afterEach( () => {
			( useSelect as jest.Mock ).mockClear();
		} );

		afterAll( () => {
			server.close();
			jest.restoreAllMocks();
		} );

		test( 'should render product specifications when product is selected', async () => {
			await setupWithSingleProduct( {}, 2 );

			await waitFor( () => {
				expect(
					screen.getByRole( 'button', { name: /description/i } )
				).toBeVisible();
				expect(
					screen.getByRole( 'button', { name: /reviews/i } )
				).toBeVisible();
				expect(
					screen.getByRole( 'button', {
						name: /additional information/i,
					} )
				).toBeVisible();
			} );

			const table = await screen.findByRole( 'table', { hidden: true } );

			expect( within( table ).getByText( /Weight/i ) ).toBeVisible();
			expect( within( table ).getByText( /150 kg/i ) ).toBeVisible();

			expect( within( table ).getByText( /Dimensions/i ) ).toBeVisible();
			expect(
				within( table ).getByText( /14 × 5.5 × 3.5 cm/i )
			).toBeVisible();

			expect( within( table ).getByText( /Material/i ) ).toBeVisible();
			expect(
				within( table ).getByText( /Acetate, Metal/i )
			).toBeVisible();
			expect( within( table ).getByText( /Size/i ) ).toBeVisible();
			expect(
				within( table ).getByText( /Medium, Large/i )
			).toBeVisible();
		} );

		test( 'should auto-remove block when product has no specifications', async () => {
			server.resetHandlers();
			server.use(
				http.get( '/wc/store/v1/products/*', () =>
					HttpResponse.json( productWithoutSpecifications )
				),
				http.get( '/wc/v3/products/*', () =>
					HttpResponse.json( productWithoutSpecifications )
				)
			);
			await setupWithSingleProduct( {}, 1 );

			await waitFor( () => {
				expect(
					screen.getByRole( 'button', { name: /description/i } )
				).toBeVisible();
				expect(
					screen.getByRole( 'button', { name: /reviews/i } )
				).toBeVisible();
				expect(
					screen.queryByRole( 'button', {
						name: /additional information/i,
					} )
				).not.toBeInTheDocument();
			} );

			expect(
				screen.queryByRole( 'table', { hidden: true } )
			).not.toBeInTheDocument();
		} );
	} );
} );
