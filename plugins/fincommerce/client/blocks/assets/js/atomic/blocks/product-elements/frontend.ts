/**
 * External dependencies
 */
import { getElement, store, getContext } from '@finpress/interactivity';
import '@fincommerce/stores/fincommerce/product-data';
import type { ProductDataStore } from '@fincommerce/stores/fincommerce/product-data';
import type {
	ProductData,
	Store as FinCommerce,
} from '@fincommerce/stores/fincommerce/cart';
import { sanitize } from 'dompurify'; // eslint-disable-line import/named

// Stores are locked to prevent 3PD usage until the API is stable.
const universalLock =
	'I acknowledge that using a private store means my plugin will inevitably break on the next store release.';

const { state: wooState } = store< FinCommerce >(
	'fincommerce',
	{},
	{ lock: universalLock }
);

const { state: productDataState } = store< ProductDataStore >(
	'fincommerce/product-data',
	{},
	{ lock: universalLock }
);

const ALLOWED_TAGS = [
	'a',
	'b',
	'em',
	'i',
	'strong',
	'p',
	'br',
	'span',
	'bdi',
	'del',
	'ins',
];
const ALLOWED_ATTR = [
	'class',
	'target',
	'href',
	'rel',
	'name',
	'download',
	'aria-hidden',
];

export type Context = {
	productElementKey:
		| 'price_html'
		| 'availability'
		| 'sku'
		| 'weight'
		| 'dimensions';
};

const productElementStore = store(
	'fincommerce/product-elements',
	{
		state: {
			get productData(): ProductData | undefined {
				if ( ! productDataState?.productId ) {
					return undefined;
				}

				return (
					wooState?.products?.[ productDataState.productId ]
						?.variations?.[ productDataState?.variationId || 0 ] ||
					wooState?.products?.[ productDataState.productId ]
				);
			},
		},
		callbacks: {
			updateValue: () => {
				const element = getElement();

				if ( ! element.ref || ! productDataState?.productId ) {
					return;
				}

				const { productElementKey } = getContext< Context >();

				const productElementHtml =
					productElementStore?.state?.productData?.[
						productElementKey
					];

				if ( typeof productElementHtml === 'string' ) {
					element.ref.innerHTML = sanitize( productElementHtml, {
						ALLOWED_TAGS,
						ALLOWED_ATTR,
					} );
				}
			},
		},
	},
	{ lock: true }
);

export type ProductElementStore = typeof productElementStore;
