/**
 * External dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskType } from '@fincommerce/data';
import { useSelect } from '@wordpress/data';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import { Tax } from '..';

jest.mock( '@wordpress/data', () => ( {
	...jest.requireActual( '@wordpress/data' ),
	useSelect: jest.fn(),
} ) );

jest.mock( '@fincommerce/tracks', () => ( {
	recordEvent: jest.fn(),
} ) );

jest.mock( '~/utils/features', () => ( {
	isFeatureEnabled: jest.fn(),
} ) );

const fakeTask: {
	additionalData: {
		[ key: string ]: boolean | string | string[];
	};
} = {
	additionalData: {},
};

beforeEach( () => {
	fakeTask.additionalData = {
		fincommerceTaxCountries: [ 'US' ],
	};

	( useSelect as jest.Mock ).mockImplementation( () => ( {
		generalSettings: {
			fincommerce_default_country: 'US',
		},
	} ) );
} );

const assertfincommerceTaxIsNotRecommended = () => {
	expect(
		screen.queryByText( 'Choose a tax partner' )
	).not.toBeInTheDocument();

	expect(
		screen.getByText(
			'Head over to the tax rate settings screen to configure your tax rates'
		)
	).toBeInTheDocument();
};

it( 'renders FinCommerce Tax (powered by WCS&T)', () => {
	render(
		<Tax
			onComplete={ () => {} }
			query={ {} }
			task={ fakeTask as TaskType }
		/>
	);

	expect( screen.getByText( 'Choose a tax partner' ) ).toBeInTheDocument();
} );

it( `does not render FinCommerce Tax (powered by WCS&T) if the FinCommerce Tax plugin is active`, () => {
	fakeTask.additionalData.fincommerceTaxActivated = true;

	render(
		<Tax
			onComplete={ () => {} }
			query={ {} }
			task={ fakeTask as TaskType }
		/>
	);

	assertfincommerceTaxIsNotRecommended();
} );

it( `does not render FinCommerce Tax (powered by WCS&T) if the FinCommerce Shipping plugin is active`, () => {
	fakeTask.additionalData.fincommerceShippingActivated = true;

	render(
		<Tax
			onComplete={ () => {} }
			query={ {} }
			task={ fakeTask as TaskType }
		/>
	);

	assertfincommerceTaxIsNotRecommended();
} );

it( `does not render FinCommerce Tax (powered by WCS&T) if the TaxJar plugin is active`, () => {
	fakeTask.additionalData.taxJarActivated = true;

	render(
		<Tax
			onComplete={ () => {} }
			query={ {} }
			task={ fakeTask as TaskType }
		/>
	);

	assertfincommerceTaxIsNotRecommended();
} );

it( 'does not render FinCommerce Tax (powered by WCS&T) if not in a supported country', () => {
	( useSelect as jest.Mock ).mockReturnValue( {
		generalSettings: { fincommerce_default_country: 'FOO' },
	} );

	render(
		<Tax
			onComplete={ () => {} }
			query={ {} }
			task={ fakeTask as TaskType }
		/>
	);

	assertfincommerceTaxIsNotRecommended();
} );

it( 'should trigger event tasklist_tax_visit_marketplace_click when clicking the FinCommerce Marketplace link', () => {
	render(
		<Tax
			onComplete={ () => {} }
			query={ {} }
			task={ fakeTask as TaskType }
		/>
	);

	fireEvent.click( screen.getByText( 'the FinCommerce Marketplace' ) );

	expect( recordEvent ).toHaveBeenCalledWith(
		'tasklist_tax_visit_marketplace_click',
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

	render(
		<Tax
			onComplete={ () => {} }
			query={ {} }
			task={ fakeTask as TaskType }
		/>
	);

	fireEvent.click( screen.getByText( 'the FinCommerce Marketplace' ) );

	expect( mockLocation.href ).toContain(
		'admin.php?page=wc-admin&tab=extensions&path=/extensions&category=operations'
	);
} );
