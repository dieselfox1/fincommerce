"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariationPricingForm = VariationPricingForm;
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const use_currency_input_props_1 = require("../../../hooks/use-currency-input-props");
function VariationPricingForm({ initialValue, onSubmit, onCancel, }) {
    const [value, setValue] = (0, element_1.useState)({
        regular_price: initialValue?.regular_price ?? '',
        sale_price: initialValue?.sale_price ?? '',
    });
    const [errors, setErrors] = (0, element_1.useState)({});
    const regularPriceInputProps = (0, use_currency_input_props_1.useCurrencyInputProps)({
        value: value.regular_price,
        onChange(regular_price) {
            setValue((current) => ({ ...current, regular_price }));
        },
    });
    const salePriceInputProps = (0, use_currency_input_props_1.useCurrencyInputProps)({
        value: value.sale_price,
        onChange(sale_price) {
            setValue((current) => ({ ...current, sale_price }));
        },
    });
    function validateRegularPrice() {
        const validationErrors = {
            regular_price: undefined,
        };
        const regularPrice = Number.parseFloat(value.regular_price);
        if (regularPrice) {
            if (regularPrice < 0) {
                validationErrors.regular_price = (0, i18n_1.__)('Regular price must be greater than or equals to zero.', 'fincommerce');
            }
            if (value.sale_price &&
                regularPrice <= Number.parseFloat(value.sale_price)) {
                validationErrors.regular_price = (0, i18n_1.__)('Regular price must be greater than the sale price.', 'fincommerce');
            }
        }
        setErrors(validationErrors);
        return !validationErrors.regular_price;
    }
    function validateSalePrice() {
        const validationErrors = {
            sale_price: undefined,
        };
        if (value.sale_price) {
            const salePrice = Number.parseFloat(value.sale_price);
            if (salePrice < 0) {
                validationErrors.sale_price = (0, i18n_1.__)('Sale price must be greater than or equals to zero.', 'fincommerce');
            }
            if (!value.regular_price ||
                Number.parseFloat(value.regular_price) <= salePrice) {
                validationErrors.sale_price = (0, i18n_1.__)('Sale price must be lower than the regular price.', 'fincommerce');
            }
        }
        setErrors(validationErrors);
        return !validationErrors.sale_price;
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (validateSalePrice() && validateRegularPrice()) {
            onSubmit?.(value);
        }
    }
    return ((0, element_1.createElement)("form", { onSubmit: handleSubmit, className: "fincommerce-variation-pricing-form", "aria-label": (0, i18n_1.__)('Variation pricing form', 'fincommerce') },
        (0, element_1.createElement)("div", { className: "fincommerce-variation-pricing-form__controls" },
            (0, element_1.createElement)(components_1.__experimentalInputControl, { ...regularPriceInputProps, name: "regular_price", label: (0, i18n_1.__)('Regular price', 'fincommerce'), help: errors.regular_price, className: (0, clsx_1.default)(regularPriceInputProps.className, {
                    'has-error': errors.regular_price,
                }), onBlur: validateRegularPrice }),
            (0, element_1.createElement)(components_1.__experimentalInputControl, { ...salePriceInputProps, name: "sale_price", label: (0, i18n_1.__)('Sale price', 'fincommerce'), help: errors.sale_price, className: (0, clsx_1.default)(salePriceInputProps.className, {
                    'has-error': errors.sale_price,
                }), onBlur: validateSalePrice })),
        (0, element_1.createElement)("div", { className: "fincommerce-variation-pricing-form__actions" },
            (0, element_1.createElement)(components_1.Button, { variant: "tertiary", onClick: onCancel }, "Cancel"),
            (0, element_1.createElement)(components_1.Button, { variant: "primary", type: "submit" }, "Save"))));
}
