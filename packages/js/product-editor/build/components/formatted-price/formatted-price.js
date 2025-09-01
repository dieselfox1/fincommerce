"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattedPrice = FormattedPrice;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const currency_1 = require("@fincommerce/currency");
const clsx_1 = __importDefault(require("clsx"));
function FormattedPrice({ product, className, ...props }) {
    const { formatAmount } = (0, element_1.useContext)(currency_1.CurrencyContext);
    return ((0, element_1.createElement)(element_1.Fragment, null, (Boolean(product.regular_price) ||
        Boolean(product.price)) && ((0, element_1.createElement)("span", { ...props, className: (0, clsx_1.default)('fincommerce-product-formatted-price', className) },
        product.on_sale && ((0, element_1.createElement)("span", null, product.sale_price
            ? formatAmount(product.sale_price)
            : formatAmount(product.price))),
        product.regular_price && ((0, element_1.createElement)("span", { className: (0, clsx_1.default)({
                'fincommerce-product-formatted-price--on-sale': product.on_sale,
            }) }, formatAmount(product.regular_price)))))));
}
