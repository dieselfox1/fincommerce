/**
 * External dependencies
 */
import { createElement, Fragment, useContext } from '@wordpress/element';
import { CurrencyContext } from '@fincommerce/currency';
import clsx from 'clsx';
export function FormattedPrice({ product, className, ...props }) {
    const { formatAmount } = useContext(CurrencyContext);
    return (createElement(Fragment, null, (Boolean(product.regular_price) ||
        Boolean(product.price)) && (createElement("span", { ...props, className: clsx('fincommerce-product-formatted-price', className) },
        product.on_sale && (createElement("span", null, product.sale_price
            ? formatAmount(product.sale_price)
            : formatAmount(product.price))),
        product.regular_price && (createElement("span", { className: clsx({
                'fincommerce-product-formatted-price--on-sale': product.on_sale,
            }) }, formatAmount(product.regular_price)))))));
}
