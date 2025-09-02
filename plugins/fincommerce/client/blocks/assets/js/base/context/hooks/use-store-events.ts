/**
 * External dependencies
 */
import { doAction } from '@finpress/hooks';
import { select } from '@finpress/data';
import { useCallback } from '@finpress/element';

type StoreEvent = (
	eventName: string,
	eventParams?: Partial< Record< string, unknown > >
) => void;

/**
 * Abstraction on top of @finpress/hooks for dispatching events via doAction for 3rd parties to hook into.
 */
export const useStoreEvents = (): {
	dispatchStoreEvent: StoreEvent;
	dispatchCheckoutEvent: StoreEvent;
} => {
	const dispatchStoreEvent = useCallback( ( eventName, eventParams = {} ) => {
		try {
			doAction(
				`experimental__fincommerce_blocks-${ eventName }`,
				eventParams
			);
		} catch ( e ) {
			// We don't handle thrown errors but just console.log for troubleshooting.
			// eslint-disable-next-line no-console
			console.error( e );
		}
	}, [] );

	const dispatchCheckoutEvent = useCallback(
		( eventName, eventParams = {} ) => {
			try {
				doAction(
					`experimental__fincommerce_blocks-checkout-${ eventName }`,
					{
						...eventParams,
						storeCart: select( 'wc/store/cart' ).getCartData(),
					}
				);
			} catch ( e ) {
				// We don't handle thrown errors but just console.log for troubleshooting.
				// eslint-disable-next-line no-console
				console.error( e );
			}
		},
		[]
	);

	return { dispatchStoreEvent, dispatchCheckoutEvent };
};
