/**
 * External dependencies
 */
import { render, fireEvent } from '@testing-library/react';
import { useSelect, useDispatch } from '@finpress/data';
import { recordEvent } from '@fincommerce/tracks';
import { useParams } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { DeleteVariationMenuItem } from '../delete-variation-menu-item';

jest.mock( '@finpress/data', () => ( {
	...jest.requireActual( '@finpress/data' ),
	useDispatch: jest.fn(),
	useSelect: jest.fn(),
} ) );
jest.mock( '@fincommerce/tracks', () => ( { recordEvent: jest.fn() } ) );

jest.mock( 'react-router-dom', () => ( { useParams: jest.fn() } ) );

jest.mock( '@finpress/core-data', () => ( {
	useEntityId: jest.fn().mockReturnValue( 'variation_1' ),
	useEntityProp: jest
		.fn()
		.mockImplementation( ( _1, _2, propType ) => [ propType ] ),
} ) );

jest.mock( '@fincommerce/product-editor', () => ( {
	RemoveConfirmationModal: jest.fn(),
	__experimentalUseVariationSwitcher: jest.fn().mockReturnValue( {
		invalidateVariationList: jest.fn(),
		goToNextVariation: jest.fn(),
		goToPreviousVariation: jest.fn(),
		numberOfVariations: 1,
	} ),
} ) );

describe( 'DeleteVariationMenuItem', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );
	it( 'should trigger product_dropdown_option_click track event when clicking the menu', async () => {
		( useDispatch as jest.Mock ).mockReturnValue( {
			deleteProductVariation: () => {},
		} );
		( useSelect as jest.Mock ).mockReturnValue( {
			type: 'simple',
			status: 'publish',
		} );
		( useParams as jest.Mock ).mockReturnValue( { productId: 1 } );
		const { getByText } = render(
			<DeleteVariationMenuItem onClose={ () => {} } />
		);
		fireEvent.click( getByText( 'Delete variation' ) );

		expect( recordEvent ).toHaveBeenCalledWith(
			'product_dropdown_option_click',
			{
				product_id: 1,
				product_status: 'status',
				selected_option: 'delete_variation',
				variation_id: 'variation_1',
			}
		);
	} );
} );
