/**
 * External dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { recordEvent } from '@fincommerce/tracks';
import { TaskType } from '@fincommerce/data';

/**
 * Internal dependencies
 */
import { Shipping } from '../index';

jest.mock( '@fincommerce/tracks', () => ( {
	recordEvent: jest.fn(),
} ) );

jest.mock( '@finpress/data', () => ( {
	...jest.requireActual( '@finpress/data' ),
	withSelect: () => ( Component: React.ComponentType ) => Component,
	withDispatch: () => ( Component: React.ComponentType ) => Component,
} ) );

jest.mock( '~/utils/features', () => ( {
	isFeatureEnabled: jest.fn(),
} ) );

describe( 'Shipping', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	const props = {
		settings: {},
		shippingPartners: [],
		activePlugins: [],
		isJetpackConnected: false,
		countryCode: 'US',
		countryName: 'United States',
		isUpdateSettingsRequesting: false,
		onComplete: jest.fn(),
		task: { id: 'shipping' } as TaskType,
	};

	it( 'should trigger event tasklist_shipping_visit_marketplace_click when clicking the FinCommerce Marketplace link', () => {
		render( <Shipping { ...props } /> );

		fireEvent.click( screen.getByText( 'the FinCommerce Marketplace' ) );

		expect( recordEvent ).toHaveBeenCalledWith(
			'tasklist_shipping_visit_marketplace_click',
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

		render( <Shipping { ...props } /> );

		fireEvent.click( screen.getByText( 'the FinCommerce Marketplace' ) );

		expect( mockLocation.href ).toContain(
			'admin.php?page=wc-admin&tab=extensions&path=/extensions&category=shipping'
		);
	} );
} );
