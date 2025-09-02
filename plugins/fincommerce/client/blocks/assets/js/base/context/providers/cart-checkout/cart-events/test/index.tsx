/**
 * External dependencies
 */
import { useCartEventsContext } from '@fincommerce/base-context';
import { useEffect } from '@finpress/element';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import { CartEventsProvider } from '@fincommerce/block-library/assets/js/base/context/providers/cart-checkout/cart-events';
import Block from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/proceed-to-checkout-block/block';

jest.mock( '@fincommerce/base-context/hooks', () => ( {
	useStoreCart: jest.fn( () => ( {
		cartIsLoading: false,
		isLoadingRates: false,
	} ) ),
} ) );

describe( 'CartEventsProvider', () => {
	it( 'allows observers to unsubscribe', async () => {
		const user = userEvent.setup();
		const mockObserver = jest.fn().mockReturnValue( { type: 'error' } );
		const MockObserverComponent = () => {
			const { onProceedToCheckout } = useCartEventsContext();

			useEffect( () => {
				const unsubscribe = onProceedToCheckout( () => {
					unsubscribe();
					mockObserver();
				} );
			}, [ onProceedToCheckout ] );
			return <div>Mock observer</div>;
		};

		render(
			<CartEventsProvider>
				<div>
					<MockObserverComponent />
					<Block checkoutPageId={ 0 } className="test-block" />
				</div>
			</CartEventsProvider>
		);

		expect( screen.getByText( 'Mock observer' ) ).toBeInTheDocument();
		const button = screen.getByText( 'Proceed to Checkout' );

		// Forcibly set the button URL to # to prevent JSDOM error: `["Error: Not implemented: navigation (except hash changes)`
		button.closest( 'a' )?.removeAttribute( 'href' );

		await act( async () => {
			await user.click( button );
		} );

		await act( async () => {
			await user.click( button );
		} );

		await waitFor( () => {
			expect( mockObserver ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
