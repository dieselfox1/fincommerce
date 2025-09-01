/**
 * External dependencies
 */
import { waitFor, render, fireEvent } from '@testing-library/react';
import { useSelect } from '@wordpress/data';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import { PaymentsBannerWrapper } from '../payment-settings-banner';

jest.mock( '@wordpress/data', () => ( {
	...jest.requireActual( '@wordpress/data' ),
	useSelect: jest.fn(),
} ) );
jest.mock( '@fincommerce/explat' );
jest.mock( '@fincommerce/tracks', () => ( { recordEvent: jest.fn() } ) );

const paymentsBannerShouldBe = async ( status: 'hidden' | 'visible' ) => {
	const { container } = render( <PaymentsBannerWrapper /> );

	await waitFor( () => {
		container.querySelector( '.fincommerce-recommended-payments-banner' );
	} );

	const banner = expect(
		container.querySelector( '.fincommerce-recommended-payments-banner' )
	);

	return status === 'visible'
		? banner.toBeInTheDocument()
		: banner.not.toBeInTheDocument();
};

const whenWcPay = ( {
	supported,
	activated,
	installed,
}: {
	supported: boolean;
	activated: boolean;
	installed: boolean;
} ) => {
	( useSelect as jest.Mock ).mockReturnValue( {
		installedPaymentGateways: [
			installed ? { id: 'fincommerce_payments', enabled: activated } : {},
		],
		paymentGatewaySuggestions: supported
			? [ { id: 'fincommerce_payments:us' } ]
			: [],
		hasFinishedResolution: true,
	} );
};

describe( 'Payment Settings Banner', () => {
	it( 'should render the banner if fincommerce payments is supported but setup not completed', async () => {
		expect.assertions( 1 );

		whenWcPay( { supported: true, activated: false, installed: true } );

		await paymentsBannerShouldBe( 'visible' );
	} );

	it( 'should not render anything if fincommerce payments is not supported', async () => {
		expect.assertions( 1 );

		whenWcPay( { supported: false, activated: false, installed: false } );

		await paymentsBannerShouldBe( 'hidden' );
	} );

	it( 'should not render anything if fincommerce payments is setup', async () => {
		expect.assertions( 1 );

		whenWcPay( { supported: true, activated: true, installed: true } );

		await paymentsBannerShouldBe( 'hidden' );
	} );

	it( 'should record track when clicking the action button', async () => {
		whenWcPay( { supported: true, activated: false, installed: true } );

		const { getByText } = render( <PaymentsBannerWrapper /> );
		fireEvent.click( getByText( 'Get started' ) );

		expect( recordEvent ).toHaveBeenCalledWith(
			'settings_payments_banner_connect_click'
		);
	} );
} );
