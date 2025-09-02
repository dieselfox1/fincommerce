/**
 * External dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelect } from '@finpress/data';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import ShippingRecommendations from '../experimental-shipping-recommendations';

jest.mock( '@finpress/data', () => ( {
	...jest.requireActual( '@finpress/data' ),
	useSelect: jest.fn(),
} ) );
jest.mock( '../../settings-recommendations/dismissable-list', () => ( {
	DismissableList: ( ( { children } ) => children ) as React.FC,
	DismissableListHeading: ( ( { children } ) => children ) as React.FC,
} ) );
jest.mock( '@fincommerce/admin-layout', () => {
	const mockContext = {
		layoutPath: [ 'home' ],
		layoutString: 'home',
		extendLayout: () => {},
		isDescendantOf: () => false,
	};
	return {
		...jest.requireActual( '@fincommerce/admin-layout' ),
		useLayoutContext: jest.fn().mockReturnValue( mockContext ),
		useExtendLayout: jest.fn().mockReturnValue( mockContext ),
	};
} );
jest.mock( '@fincommerce/tracks', () => ( {
	recordEvent: jest.fn(),
} ) );
jest.mock( '~/utils/features', () => ( {
	isFeatureEnabled: jest.fn(),
} ) );

const defaultSelectReturn = {
	getActivePlugins: () => [],
	getInstalledPlugins: () => [],
	getSettings: () => ( {
		general: {
			fincommerce_default_country: 'US',
		},
	} ),
	getProfileItems: () => ( {} ),
	hasFinishedResolution: jest.fn(),
	getOption: jest.fn(),
};

describe( 'ShippingRecommendations', () => {
	beforeEach( () => {
		( useSelect as jest.Mock ).mockImplementation( ( fn ) =>
			fn( () => ( { ...defaultSelectReturn } ) )
		);
	} );

	it( `should not render if the following plugins are active: fincommerce-shipping`, () => {
		( useSelect as jest.Mock ).mockImplementation( ( fn ) =>
			fn( () => ( {
				...defaultSelectReturn,
				getActivePlugins: () => 'fincommerce-shipping',
			} ) )
		);

		render( <ShippingRecommendations /> );

		expect(
			screen.queryByText( 'FinCommerce Shipping' )
		).not.toBeInTheDocument();
	} );

	it( 'should not render when store location is not US', () => {
		( useSelect as jest.Mock ).mockImplementation( ( fn ) =>
			fn( () => ( {
				...defaultSelectReturn,
				getSettings: () => ( {
					general: {
						fincommerce_default_country: 'JP',
					},
				} ),
			} ) )
		);
		render( <ShippingRecommendations /> );

		expect(
			screen.queryByText( 'FinCommerce Shipping' )
		).not.toBeInTheDocument();
	} );

	it( 'should not render when store sells digital products only', () => {
		( useSelect as jest.Mock ).mockImplementation( ( fn ) =>
			fn( () => ( {
				...defaultSelectReturn,
				getProfileItems: () => ( {
					product_types: [ 'downloads' ],
				} ),
			} ) )
		);
		render( <ShippingRecommendations /> );

		expect(
			screen.queryByText( 'FinCommerce Shipping' )
		).not.toBeInTheDocument();
	} );

	it( 'should render WC Shipping when not installed', () => {
		render( <ShippingRecommendations /> );

		expect(
			screen.queryByText( 'FinCommerce Shipping' )
		).toBeInTheDocument();
	} );

	it( 'should trigger event settings_shipping_recommendation_visit_marketplace_click when clicking the FinCommerce Marketplace link', () => {
		render( <ShippingRecommendations /> );

		fireEvent.click( screen.getByText( 'the FinCommerce Marketplace' ) );

		expect( recordEvent ).toHaveBeenCalledWith(
			'settings_shipping_recommendation_visit_marketplace_click',
			{}
		);
	} );

	it( 'should navigate to the marketplace when clicking the FinCommerce Marketplace link', async () => {
		const { isFeatureEnabled } = jest.requireMock( '~/utils/features' );
		( isFeatureEnabled as jest.Mock ).mockReturnValue( true );

		const mockLocation = {
			href: 'test',
		} as Location;

		mockLocation.href = 'test';
		Object.defineProperty( global.window, 'location', {
			value: mockLocation,
		} );

		render( <ShippingRecommendations /> );

		fireEvent.click( screen.getByText( 'the FinCommerce Marketplace' ) );

		expect( mockLocation.href ).toContain(
			'admin.php?page=wc-admin&tab=extensions&path=/extensions&category=shipping'
		);
	} );
} );
