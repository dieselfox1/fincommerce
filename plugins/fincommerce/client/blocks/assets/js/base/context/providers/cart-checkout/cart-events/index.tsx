/**
 * External dependencies
 */

import {
	createContext,
	useContext,
	useReducer,
	useRef,
	useEffect,
} from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	useEventEmitters,
	reducer as emitReducer,
	emitEventWithAbort,
	EVENTS,
} from '@fincommerce/block-library/assets/js/base/context/providers/cart-checkout/cart-events/event-emit';
import type { emitterCallback } from '@fincommerce/block-library/assets/js/base/context/event-emit';

type CartEventsContextType = {
	// Used to register a callback that will fire when the cart has been processed and has an error.
	onProceedToCheckout: ReturnType< typeof emitterCallback >;
	// Used to register a callback that will fire when the cart has been processed and has an error.
	dispatchOnProceedToCheckout: () => Promise< unknown[] >;
};

const CartEventsContext = createContext< CartEventsContextType >( {
	onProceedToCheckout: () => () => void null,
	dispatchOnProceedToCheckout: () => new Promise( () => void null ),
} );

export const useCartEventsContext = () => {
	return useContext( CartEventsContext );
};

/**
 * Checkout Events provider
 * Emit Checkout events and provide access to Checkout event handlers
 *
 * @param {Object} props          Incoming props for the provider.
 * @param {Object} props.children The children being wrapped.
 */
export const CartEventsProvider = ( {
	children,
}: {
	children: React.ReactNode;
} ): JSX.Element => {
	const [ observers, observerDispatch ] = useReducer( emitReducer, {} );
	const currentObservers = useRef( observers );
	const { onProceedToCheckout } = useEventEmitters( observerDispatch );

	// set observers on ref so it's always current.
	useEffect( () => {
		currentObservers.current = observers;
	}, [ observers ] );

	const dispatchOnProceedToCheckout = async () => {
		return await emitEventWithAbort(
			currentObservers.current,
			EVENTS.PROCEED_TO_CHECKOUT,
			null
		);
	};

	const cartEvents = {
		onProceedToCheckout,
		dispatchOnProceedToCheckout,
	};
	return (
		<CartEventsContext.Provider value={ cartEvents }>
			{ children }
		</CartEventsContext.Provider>
	);
};
