/**
 * External dependencies
 */
import clsx from 'clsx';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { useInstanceId } from '@wordpress/compose';
import { useEntityProp } from '@wordpress/core-data';
import { createElement, useEffect } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';
import { BaseControl, __experimentalInputControl as InputControl, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { Label } from '../../../components/label/label';
import { useValidation } from '../../../contexts/validation-context';
import { useCurrencyInputProps } from '../../../hooks/use-currency-input-props';
import { sanitizeHTML } from '../../../utils/sanitize-html';
export function Edit({ attributes, clientId, context, }) {
    const blockProps = useWooBlockProps(attributes);
    const { label, help, isRequired, tooltip, disabled } = attributes;
    const [regularPrice, setRegularPrice] = useEntityProp('postType', context.postType || 'product', 'regular_price');
    const [salePrice] = useEntityProp('postType', context.postType || 'product', 'sale_price');
    const inputProps = useCurrencyInputProps({
        value: regularPrice,
        onChange: setRegularPrice,
    });
    function renderHelp() {
        if (help) {
            return createElement("span", { dangerouslySetInnerHTML: sanitizeHTML(help) });
        }
    }
    const regularPriceId = useInstanceId(BaseControl, 'wp-block-fincommerce-product-regular-price-field');
    const { ref: regularPriceRef, error: regularPriceValidationError, validate: validateRegularPrice, } = useValidation(`regular_price-${clientId}`, async function regularPriceValidator() {
        const listPrice = Number.parseFloat(regularPrice);
        if (listPrice) {
            if (listPrice < 0) {
                return {
                    message: __('Regular price must be greater than or equals to zero.', 'fincommerce'),
                };
            }
            if (salePrice &&
                listPrice <= Number.parseFloat(salePrice)) {
                return {
                    message: __('Regular price must be greater than the sale price.', 'fincommerce'),
                };
            }
        }
        else if (isRequired) {
            return {
                message: sprintf(
                /* translators: label of required field. */
                __('%s is required.', 'fincommerce'), label),
            };
        }
    }, [regularPrice, salePrice]);
    useEffect(() => {
        if (isRequired) {
            validateRegularPrice();
        }
    }, []);
    return (createElement("div", { ...blockProps },
        createElement(BaseControl, { id: regularPriceId, help: regularPriceValidationError
                ? regularPriceValidationError
                : renderHelp(), className: clsx({
                'has-error': regularPriceValidationError,
            }) },
            createElement(InputControl, { ...inputProps, id: regularPriceId, name: 'regular_price', inputMode: "decimal", ref: regularPriceRef, label: tooltip ? (createElement(Label, { label: label, tooltip: tooltip })) : (label), disabled: disabled, onBlur: () => validateRegularPrice() }))));
}
