/**
 * External dependencies
 */
import clsx from 'clsx';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { useInstanceId } from '@wordpress/compose';
import { useEntityProp } from '@wordpress/core-data';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { BaseControl, __experimentalInputControl as InputControl, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { useValidation } from '../../../contexts/validation-context';
import { useCurrencyInputProps } from '../../../hooks/use-currency-input-props';
import { Label } from '../../../components/label/label';
export function Edit({ attributes, clientId, context, }) {
    const blockProps = useWooBlockProps(attributes);
    const { label, help, tooltip, disabled } = attributes;
    const [regularPrice] = useEntityProp('postType', context.postType || 'product', 'regular_price');
    const [salePrice, setSalePrice] = useEntityProp('postType', context.postType || 'product', 'sale_price');
    const inputProps = useCurrencyInputProps({
        value: salePrice,
        onChange: setSalePrice,
    });
    const salePriceId = useInstanceId(BaseControl, 'wp-block-fincommerce-product-sale-price-field');
    const { ref: salePriceRef, error: salePriceValidationError, validate: validateSalePrice, } = useValidation(`sale-price-${clientId}`, async function salePriceValidator() {
        if (salePrice) {
            if (Number.parseFloat(salePrice) < 0) {
                return {
                    message: __('Sale price must be greater than or equals to zero.', 'fincommerce'),
                };
            }
            const listPrice = Number.parseFloat(regularPrice);
            if (!listPrice ||
                listPrice <= Number.parseFloat(salePrice)) {
                return {
                    message: __('Sale price must be lower than the regular price.', 'fincommerce'),
                };
            }
        }
    }, [regularPrice, salePrice]);
    return (createElement("div", { ...blockProps },
        createElement(BaseControl, { id: salePriceId, help: salePriceValidationError ? salePriceValidationError : help, className: clsx({
                'has-error': salePriceValidationError,
            }) },
            createElement(InputControl, { ...inputProps, id: salePriceId, name: 'sale_price', inputMode: "decimal", ref: salePriceRef, label: tooltip ? (createElement(Label, { label: label, tooltip: tooltip })) : (label), disabled: disabled, onBlur: () => validateSalePrice() }))));
}
