/**
 * External dependencies
 */
import { store, getContext, useLayoutEffect } from '@wordpress/interactivity';
import type { Store as FinCommerce } from '@fincommerce/stores/fincommerce/cart';

/**
 * Internal dependencies
 */
import { doesCartItemMatchAttributes } from '@fincommerce/block-library/assets/js/base/utils/variations/does-cart-item-match-attributes';
import type { AddToCartWithOptionsStore } from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/frontend';

// Stores are locked to prevent 3PD usage until the API is stable.
const universalLock =
	'I acknowledge that using a private store means my plugin will inevitably break on the next store release.';

interface Context {
	addToCartText: string;
	productId: number;
	productType: string;
	groupedProductIds?: number[];
	displayViewCart: boolean;
	quantityToAdd: number;
	tempQuantity: number;
	animationStatus: AnimationStatus;
	hasPressedButton: boolean;
	inTheCartText: string;
}

enum AnimationStatus {
	IDLE = 'IDLE',
	SLIDE_OUT = 'SLIDE-OUT',
	SLIDE_IN = 'SLIDE-IN',
}

type ServerState = {
	state: {
		inTheCartText: string;
		addToCartText: string;
		noticeId: string;
	};
};

const { state: wooState } = store< FinCommerce >(
	'fincommerce',
	{},
	{ lock: universalLock }
);

const { state: addToCartWithOptionsState } = store< AddToCartWithOptionsStore >(
	'fincommerce/add-to-cart-with-options',
	{},
	{ lock: universalLock }
);

const productButtonStore = {
	state: {
		get quantity(): number {
			const products = wooState.cart?.items.filter(
				( item ) => item.id === state.productId
			);

			if ( products.length === 0 ) {
				return 0;
			}

			// Return the product quantity when the item is a non-variable product.
			if ( products[ 0 ]?.type !== 'variation' ) {
				return products[ 0 ]?.quantity || 0;
			}

			const selectedAttributes =
				addToCartWithOptionsState?.selectedAttributes;
			const selectedVariableProduct = products.find( ( item ) =>
				doesCartItemMatchAttributes( item, selectedAttributes )
			);

			return selectedVariableProduct?.quantity || 0;
		},
		get slideInAnimation() {
			const { animationStatus } = getContext< Context >();
			return animationStatus === AnimationStatus.SLIDE_IN;
		},
		get slideOutAnimation() {
			const { animationStatus } = getContext< Context >();
			return animationStatus === AnimationStatus.SLIDE_OUT;
		},
		get addToCartText(): string {
			const {
				animationStatus,
				tempQuantity,
				addToCartText,
				productType,
				groupedProductIds,
				hasPressedButton,
				inTheCartText,
			} = getContext< Context >();

			// We use the temporary quantity when there's no animation, or
			// when the second part of the animation hasn't started yet.
			const showTemporaryNumber =
				animationStatus === AnimationStatus.IDLE ||
				animationStatus === AnimationStatus.SLIDE_OUT;
			const quantity = showTemporaryNumber
				? tempQuantity || 0
				: state.quantity;

			if ( productType === 'grouped' ) {
				const groupedProductIdsInCart = groupedProductIds?.map(
					( productId ) => {
						const product = wooState.cart?.items.find(
							( item ) => item.id === productId
						);
						return product?.quantity || 0;
					}
				);
				if (
					groupedProductIdsInCart?.some( ( qty ) => qty > 0 ) &&
					hasPressedButton
				) {
					return inTheCartText;
				}
				return addToCartText;
			}

			if ( quantity > 0 ) {
				return inTheCartText.replace( '###', quantity.toString() );
			}

			return addToCartText;
		},
		get displayViewCart(): boolean {
			const { displayViewCart } = getContext< Context >();
			if ( ! displayViewCart ) return false;
			return state.quantity > 0;
		},
		get productId() {
			return (
				addToCartWithOptionsState?.variationId ||
				getContext< Context >().productId
			);
		},
	},
	actions: {
		*addCartItem(): Generator< unknown, void > {
			const context = getContext< Context >();

			// Todo: Use the module exports instead of `store()` once the
			// fincommerce store is public.
			yield import( '@fincommerce/stores/fincommerce/cart' );

			const { actions } = store< FinCommerce >(
				'fincommerce',
				{},
				{ lock: universalLock }
			);

			yield actions.addCartItem( {
				id: state.productId,
				quantity: state.quantity + context.quantityToAdd,
				type: context.productType,
			} );

			context.displayViewCart = true;
		},
		*refreshCartItems() {
			// Todo: Use the module exports instead of `store()` once the
			// fincommerce store is public.
			yield import( '@fincommerce/stores/fincommerce/cart' );
			const { actions } = store< FinCommerce >(
				'fincommerce',
				{},
				{ lock: universalLock }
			);
			actions.refreshCartItems();
		},
		handleAnimationEnd( event: AnimationEvent ) {
			const context = getContext< Context >();
			if ( event.animationName === 'slideOut' ) {
				// When the first part of the animation (slide-out) ends, we move
				// to the second part (slide-in).
				context.animationStatus = AnimationStatus.SLIDE_IN;
			} else if ( event.animationName === 'slideIn' ) {
				// When the second part of the animation ends, we update the
				// temporary quantity to sync it with the cart and reset the
				// animation status so it can be triggered again.
				context.tempQuantity = state.quantity;
				context.animationStatus = AnimationStatus.IDLE;
			}
		},
		handlePressedState() {
			const context = getContext< Context >();

			// Only handle the pressed state if the form is valid.
			if (
				addToCartWithOptionsState?.isFormValid === undefined ||
				addToCartWithOptionsState?.isFormValid
			) {
				context.hasPressedButton = true;
				context.animationStatus = AnimationStatus.SLIDE_OUT;
			}
		},
	},
	callbacks: {
		syncTempQuantityOnLoad() {
			const context = getContext< Context >();
			// When we instantiate this element, we sync the temporary
			// quantity with the quantity in the cart to avoid triggering
			// the animation. We do this only once, and we use
			// useLayoutEffect to avoid the useEffect flickering.
			// eslint-disable-next-line react-hooks/rules-of-hooks
			useLayoutEffect( () => {
				context.tempQuantity = state.quantity;
				// eslint-disable-next-line react-hooks/exhaustive-deps
			}, [] );
		},
		startAnimation() {
			const context = getContext< Context >();
			// We start the animation if the temporary quantity is out of
			// sync with the quantity in the cart and the animation hasn't
			// started yet.
			// We skip the animation altogether if the Add to Cart + Options form is invalid.
			if (
				context.tempQuantity !== state.quantity &&
				context.animationStatus === AnimationStatus.IDLE
			) {
				context.animationStatus = AnimationStatus.SLIDE_OUT;
			}
		},
	},
};

const { state } = store< typeof productButtonStore & ServerState >(
	'fincommerce/product-button',
	productButtonStore,
	{ lock: true }
);
