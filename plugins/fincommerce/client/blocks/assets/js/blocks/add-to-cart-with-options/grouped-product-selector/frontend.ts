/**
 * External dependencies
 */
import { store, getContext, getConfig } from '@finpress/interactivity';
import type {
	ClientCartItem,
	Store as FinCommerce,
} from '@fincommerce/stores/fincommerce/cart';

/**
 * Internal dependencies
 */
import type {
	AddToCartWithOptionsStore,
	Context as AddToCartWithOptionsStoreContext,
} from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/frontend';
import { getNewQuantity, getProductData } from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/frontend';

// Stores are locked to prevent 3PD usage until the API is stable.
const universalLock =
	'I acknowledge that using a private store means my plugin will inevitably break on the next store release.';

export type GroupedProductAddToCartWithOptionsStore =
	AddToCartWithOptionsStore & {
		actions: {
			validateQuantity: ( value?: number ) => void;
			addToCart: () => void;
		};
		callbacks: {
			validateQuantities: () => void;
		};
	};

const { actions } = store< GroupedProductAddToCartWithOptionsStore >(
	'fincommerce/add-to-cart-with-options',
	{
		actions: {
			validateQuantity() {
				actions.clearErrors( 'invalid-quantities' );

				const { errorMessages } = getConfig();
				const context =
					getContext< AddToCartWithOptionsStoreContext >();

				// Validate that at least one product quantity is above 0.
				const hasNonZeroQuantity = Object.values(
					context.quantity
				).some( ( qty ) => qty > 0 );

				if ( ! hasNonZeroQuantity ) {
					actions.addError( {
						code: 'groupedProductAddToCartMissingItems',
						message:
							errorMessages?.groupedProductAddToCartMissingItems ||
							'',
						group: 'invalid-quantities',
					} );

					return;
				}

				// Validate that all product quantities are within the min and max (or 0).
				const hasInvalidQuantity = Object.entries(
					context.quantity
				).some( ( [ id, qty ] ) => {
					const productObject = getProductData(
						Number( id ),
						context.productType,
						context.availableVariations,
						context.selectedAttributes
					);
					return (
						qty !== 0 &&
						( qty < ( productObject?.min ?? 0 ) ||
							qty > ( productObject?.max ?? Infinity ) )
					);
				} );

				if ( hasInvalidQuantity ) {
					actions.addError( {
						code: 'invalidQuantities',
						message: errorMessages?.invalidQuantities || '',
						group: 'invalid-quantities',
					} );
				}
			},
			*addToCart() {
				// Todo: Use the module exports instead of `store()` once the
				// fincommerce store is public.
				yield import( '@fincommerce/stores/fincommerce/cart' );

				const {
					quantity,
					selectedAttributes,
					productType,
					groupedProductIds,
				} = getContext< AddToCartWithOptionsStoreContext >();

				const addedItems: ClientCartItem[] = [];

				for ( const childProductId of groupedProductIds ) {
					if ( quantity[ childProductId ] === 0 ) {
						continue;
					}

					const newQuantity = getNewQuantity(
						childProductId,
						quantity[ childProductId ]
					);

					addedItems.push( {
						id: childProductId,
						quantity: newQuantity,
						variation: selectedAttributes,
						type: productType,
					} );
				}

				const { actions: wooActions } = store< FinCommerce >(
					'fincommerce',
					{},
					{ lock: universalLock }
				);

				yield wooActions.batchAddCartItems( addedItems );
			},
		},
		callbacks: {
			validateQuantities() {
				actions.validateQuantity();
			},
		},
	},
	{ lock: universalLock }
);
