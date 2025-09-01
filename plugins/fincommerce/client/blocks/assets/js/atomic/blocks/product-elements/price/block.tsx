/**
 * External dependencies
 */
import clsx from 'clsx';
import { ProductEntityResponse } from '@fincommerce/entities';
import ProductPrice from '@fincommerce/base-components/product-price';
import { getCurrencyFromPriceResponse } from '@fincommerce/price-format';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@fincommerce/shared-context';
import { useStyleProps } from '@fincommerce/base-hooks';
import { withProductDataContext } from '@fincommerce/shared-hocs';
import { CurrencyCode } from '@fincommerce/type-defs/currency';
import type { HTMLAttributes } from 'react';
import type { Currency, ProductResponseItem } from '@fincommerce/types';
import { SITE_CURRENCY } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import type { BlockAttributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/price/types';

type Props = BlockAttributes &
	HTMLAttributes< HTMLDivElement > & {
		isAdmin: boolean;
		isExperimentalWcRestApiEnabled: boolean;
		product: ProductResponseItem | ProductEntityResponse | undefined;
	};

interface PriceProps {
	currency_code: CurrencyCode;
	currency_symbol: string;
	currency_minor_unit: number;
	currency_decimal_separator: string;
	currency_thousand_separator: string;
	currency_prefix: string;
	currency_suffix: string;
	price: string;
	regular_price: string;
	sale_price: string;
	price_range: null | { min_amount: string; max_amount: string };
}

/**
 * Converts a price string from the Admin API format to the Store API format.
 *
 * The Admin API returns prices as decimal numbers (e.g., "12.99"), while the Store API
 * expects prices as integers representing the smallest currency unit (e.g., "1299" for $12.99).
 * This function multiplies the price by 100 to convert from decimal to minor units.
 *
 * @param priceString The price as a string from the Admin API (e.g., "12.99")
 * @param currency    The currency object
 * @param fallback    The fallback value if priceString is null/undefined (defaults to "0")
 * @return The price converted to minor units as a string (e.g., "1299")
 */
const convertAdminPriceToStoreApiFormat = (
	priceString: string | null | undefined,
	currency: Currency,
	fallback = '0'
) => {
	const multiplier = 10 ** currency.minorUnit;
	return (
		Number.parseFloat( priceString ?? fallback ) * multiplier
	).toString();
};

export const Block = ( props: Props ): JSX.Element | null => {
	const {
		className,
		textAlign,
		isDescendentOfSingleProductTemplate,
		isAdmin,
		product: productData,
		isExperimentalWcRestApiEnabled,
	} = props;

	const styleProps = useStyleProps( props );
	const { parentName, parentClassName } = useInnerBlockLayoutContext();
	const { product } = useProductDataContext(
		/**
		 * This block can depend on the core-data package only when the experimental WC Rest API feature flag is enabled because
		 * it depends on experimental fields: https://github.com/dieselfox1/fincommerce/pull/60101
		 */
		isExperimentalWcRestApiEnabled
			? {
					isAdmin,
					product: productData,
			  }
			: undefined
	);

	const isDescendentOfAllProductsBlock =
		parentName === 'fincommerce/all-products';
	const isDescendentOfAddToCartGroupedProductSelectorBlock =
		parentName ===
		'fincommerce/add-to-cart-with-options-grouped-product-item';

	const showPricePreview =
		isDescendentOfSingleProductTemplate &&
		! isDescendentOfAddToCartGroupedProductSelectorBlock;

	const wrapperClassName = clsx(
		'wc-block-components-product-price',
		className,
		styleProps.className,
		{
			[ `${ parentClassName }__product-price` ]: parentClassName,
		}
	);

	if ( ! product?.id && ! isDescendentOfSingleProductTemplate ) {
		const productPriceComponent = (
			<ProductPrice align={ textAlign } className={ wrapperClassName } />
		);
		if ( isDescendentOfAllProductsBlock ) {
			return (
				<div className="wp-block-fincommerce-product-price">
					{ productPriceComponent }
				</div>
			);
		}
		return productPriceComponent;
	}

	let prices: PriceProps = product?.prices ?? {};
	const currency = showPricePreview
		? getCurrencyFromPriceResponse()
		: getCurrencyFromPriceResponse( prices );

	if ( isExperimentalWcRestApiEnabled ) {
		prices = {
			price: convertAdminPriceToStoreApiFormat(
				product?.price,
				currency
			),
			...( product?.sale_price
				? {
						sale_price: convertAdminPriceToStoreApiFormat(
							product?.sale_price,
							currency
						),
				  }
				: {} ),
			...( product?.regular_price
				? {
						regular_price: convertAdminPriceToStoreApiFormat(
							product?.regular_price,
							currency
						),
				  }
				: {} ),
			currency_minor_unit: SITE_CURRENCY.minorUnit,
			price_range:
				product?.__experimental_max_price &&
				product?.__experimental_min_price
					? {
							min_amount: convertAdminPriceToStoreApiFormat(
								product.__experimental_min_price,
								currency
							),
							max_amount: convertAdminPriceToStoreApiFormat(
								product.__experimental_max_price,
								currency
							),
					  }
					: null,
		};
	}

	const pricePreview = '5000';
	const isOnSale = prices.price !== prices.regular_price;
	const priceClassName = clsx( {
		[ `${ parentClassName }__product-price__value` ]: parentClassName,
		[ `${ parentClassName }__product-price__value--on-sale` ]: isOnSale,
	} );

	const productPriceComponent = (
		<ProductPrice
			align={ textAlign }
			className={ wrapperClassName }
			style={ styleProps.style }
			regularPriceStyle={ styleProps.style }
			priceStyle={ styleProps.style }
			priceClassName={ priceClassName }
			currency={ currency }
			price={ showPricePreview ? pricePreview : prices.price }
			// Range price props
			minPrice={ prices?.price_range?.min_amount }
			maxPrice={ prices?.price_range?.max_amount }
			// This is the regular or original price when the `price` value is a sale price.
			regularPrice={
				showPricePreview ? pricePreview : prices.regular_price
			}
			regularPriceClassName={ clsx( {
				[ `${ parentClassName }__product-price__regular` ]:
					parentClassName,
			} ) }
		/>
	);
	if ( isDescendentOfAllProductsBlock ) {
		return (
			<div className="wp-block-fincommerce-product-price">
				{ productPriceComponent }
			</div>
		);
	}
	return productPriceComponent;
};

export default ( props: Props ) => {
	// It is necessary because this block has to support several contexts:
	// - Inside `All Products Block` -> `withProductDataContext` HOC
	// - Inside `Products Block` -> Gutenberg Context
	// - Inside `Single Product Template` -> Gutenberg Context
	// - Without any parent -> `WithSelector` and `withProductDataContext` HOCs
	// For more details, check https://github.com/dieselfox1/fincommerce-blocks/pull/8609
	if ( props.isDescendentOfSingleProductTemplate ) {
		return <Block { ...props } />;
	}
	return withProductDataContext( Block )( props );
};
