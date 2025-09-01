/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import fincommerceShippingItem from '../experimental-fincommerce-shipping-item';
jest.mock( '@fincommerce/tracks', () => ( {
	...jest.requireActual( '@fincommerce/tracks' ),
	recordEvent: jest.fn(),
} ) );

jest.mock( '@fincommerce/admin-layout', () => {
	const mockContext = {
		layoutPath: [ 'root' ],
		layoutString: 'root',
		extendLayout: () => {},
		isDescendantOf: () => false,
	};
	return {
		...jest.requireActual( '@fincommerce/admin-layout' ),
		useLayoutContext: jest.fn().mockReturnValue( mockContext ),
		useExtendLayout: jest.fn().mockReturnValue( mockContext ),
	};
} );

describe( 'fincommerceShippingItem', () => {
	it( 'should render WC Shipping item with CTA = "Get started" when WC Shipping is not installed', () => {
		render( <fincommerceShippingItem isPluginInstalled={ false } /> );

		expect(
			screen.queryByText( 'FinCommerce Shipping' )
		).toBeInTheDocument();

		expect(
			screen.queryByRole( 'button', { name: 'Get started' } )
		).toBeInTheDocument();
	} );

	it( 'should render WC Shipping item with CTA = "Activate" when WC Shipping is installed', () => {
		render( <fincommerceShippingItem isPluginInstalled={ true } /> );

		expect(
			screen.queryByText( 'FinCommerce Shipping' )
		).toBeInTheDocument();

		expect(
			screen.queryByRole( 'button', { name: 'Activate' } )
		).toBeInTheDocument();
	} );

	it( 'should record track when clicking setup button', () => {
		render( <fincommerceShippingItem isPluginInstalled={ false } /> );

		screen.queryByRole( 'button', { name: 'Get started' } )?.click();
		expect( recordEvent ).toHaveBeenCalledWith( 'tasklist_click', {
			context: 'root/wc-settings',
			task_name: 'shipping-recommendation',
		} );
	} );
} );
