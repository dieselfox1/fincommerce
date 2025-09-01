import { createElement, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { Button, __experimentalInputControl as InputControl, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { useCurrencyInputProps } from '../../../hooks/use-currency-input-props';
export function VariationPricingForm({ initialValue, onSubmit, onCancel, }) {
    const [value, setValue] = useState({
        regular_price: initialValue?.regular_price ?? '',
        sale_price: initialValue?.sale_price ?? '',
    });
    const [errors, setErrors] = useState({});
    const regularPriceInputProps = useCurrencyInputProps({
        value: value.regular_price,
        onChange(regular_price) {
            setValue((current) => ({ ...current, regular_price }));
        },
    });
    const salePriceInputProps = useCurrencyInputProps({
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
                validationErrors.regular_price = __('Regular price must be greater than or equals to zero.', 'fincommerce');
            }
            if (value.sale_price &&
                regularPrice <= Number.parseFloat(value.sale_price)) {
                validationErrors.regular_price = __('Regular price must be greater than the sale price.', 'fincommerce');
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
                validationErrors.sale_price = __('Sale price must be greater than or equals to zero.', 'fincommerce');
            }
            if (!value.regular_price ||
                Number.parseFloat(value.regular_price) <= salePrice) {
                validationErrors.sale_price = __('Sale price must be lower than the regular price.', 'fincommerce');
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
    return (createElement("form", { onSubmit: handleSubmit, className: "fincommerce-variation-pricing-form", "aria-label": __('Variation pricing form', 'fincommerce') },
        createElement("div", { className: "fincommerce-variation-pricing-form__controls" },
            createElement(InputControl, { ...regularPriceInputProps, name: "regular_price", label: __('Regular price', 'fincommerce'), help: errors.regular_price, className: clsx(regularPriceInputProps.className, {
                    'has-error': errors.regular_price,
                }), onBlur: validateRegularPrice }),
            createElement(InputControl, { ...salePriceInputProps, name: "sale_price", label: __('Sale price', 'fincommerce'), help: errors.sale_price, className: clsx(salePriceInputProps.className, {
                    'has-error': errors.sale_price,
                }), onBlur: validateSalePrice })),
        createElement("div", { className: "fincommerce-variation-pricing-form__actions" },
            createElement(Button, { variant: "tertiary", onClick: onCancel }, "Cancel"),
            createElement(Button, { variant: "primary", type: "submit" }, "Save"))));
}
