/**
 * External dependencies
 */
import { getContext, store } from '@finpress/interactivity';

type EntityId = number | null;
type ProductRef = {
	productId: EntityId;
	variationId: EntityId;
};

export type Context = ProductRef;

type ServerState = {
	templateState: ProductRef;
};

const productDataStore = store< {
	state: ProductRef & ServerState;
	actions: {
		setVariationId: ( variationId: EntityId ) => void;
	};
} >(
	'fincommerce/product-data',
	{
		state: {
			get productId(): EntityId {
				const context = getContext< Context >(
					'fincommerce/single-product'
				);

				return (
					context?.productId ||
					productDataStore?.state?.templateState?.productId
				);
			},
			get variationId(): EntityId {
				const context = getContext< Context >(
					'fincommerce/single-product'
				);

				return (
					context?.variationId ||
					productDataStore?.state?.templateState?.variationId
				);
			},
		},
		actions: {
			setVariationId: ( variationId: EntityId ) => {
				const context = getContext< Context >(
					'fincommerce/single-product'
				);

				if ( context?.variationId !== undefined ) {
					context.variationId = variationId;
				} else if (
					productDataStore?.state?.templateState?.variationId !==
					undefined
				) {
					productDataStore.state.templateState.variationId =
						variationId;
				}
			},
		},
	},
	{ lock: true }
);

export type ProductDataStore = typeof productDataStore;
