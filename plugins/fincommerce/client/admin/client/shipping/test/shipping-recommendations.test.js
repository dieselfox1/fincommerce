/**
 * External dependencies
 */
import { render, screen, waitFor } from '@testing-library/react';
import { useDispatch, useSelect } from '@finpress/data';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import ShippingRecommendations from '../shipping-recommendations';

jest.mock( '@finpress/data', () => ( {
	...jest.requireActual( '@finpress/data' ),
	useSelect: jest.fn(),
	useDispatch: jest.fn(),
} ) );
jest.mock( '../../settings-recommendations/dismissable-list', () => ( {
	DismissableList: ( { children } ) => children,
	DismissableListHeading: ( { children } ) => children,
} ) );
jest.mock( '../../lib/notices', () => ( {
	createNoticesFromResponse: () => null,
} ) );

describe( 'ShippingRecommendations', () => {
	beforeEach( () => {
		useSelect.mockImplementation( ( fn ) =>
			fn( () => ( {
				getActivePlugins: () => [],
				isJetpackConnected: () => false,
			} ) )
		);
		useDispatch.mockReturnValue( {
			installAndActivatePlugins: () => Promise.resolve(),
			createSuccessNotice: () => null,
		} );
	} );

	it( 'should render when WCS&T is installed', () => {
		useSelect.mockImplementation( ( fn ) =>
			fn( () => ( {
				getActivePlugins: () => [ 'fincommerce-services' ],
				isJetpackConnected: () => false,
			} ) )
		);
		render( <ShippingRecommendations /> );

		expect(
			screen.queryByText( 'FinCommerce Shipping' )
		).toBeInTheDocument();
	} );

	it( 'should not render when the FinCommerce Shipping plugin is active', () => {
		useSelect.mockImplementation( ( fn ) =>
			fn( () => ( {
				getActivePlugins: () => [ 'fincommerce-shipping' ],
			} ) )
		);
		render( <ShippingRecommendations /> );

		expect(
			screen.queryByText( 'FinCommerce Shipping' )
		).not.toBeInTheDocument();
	} );

	it( 'should render when FinCommerce Shipping is not installed', () => {
		render( <ShippingRecommendations /> );

		expect(
			screen.queryByText( 'FinCommerce Shipping' )
		).toBeInTheDocument();
	} );

	it( 'allows to install FinCommerce Shipping', async () => {
		const installAndActivatePluginsMock = jest
			.fn()
			.mockResolvedValue( undefined );
		const successNoticeMock = jest.fn();
		useDispatch.mockReturnValue( {
			installAndActivatePlugins: installAndActivatePluginsMock,
			isJetpackConnected: () => false,
			createSuccessNotice: successNoticeMock,
		} );
		render( <ShippingRecommendations /> );

		expect( installAndActivatePluginsMock ).not.toHaveBeenCalled();
		expect( successNoticeMock ).not.toHaveBeenCalled();

		userEvent.click( screen.getByText( 'Get started' ) );

		expect( installAndActivatePluginsMock ).toHaveBeenCalled();
		await waitFor( () => {
			expect( successNoticeMock ).toHaveBeenCalledWith(
				'🎉 FinCommerce Shipping is installed!',
				expect.anything()
			);
		} );
	} );
} );
