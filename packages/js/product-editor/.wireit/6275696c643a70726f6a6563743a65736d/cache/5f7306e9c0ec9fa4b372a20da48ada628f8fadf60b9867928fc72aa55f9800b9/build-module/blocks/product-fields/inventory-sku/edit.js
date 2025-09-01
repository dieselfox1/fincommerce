/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { createElement, createInterpolateElement } from '@wordpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { BaseControl, __experimentalInputControl as InputControl, } from '@wordpress/components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { useEntityProp } from '@wordpress/core-data';
import { useValidation } from '../../../contexts/validation-context';
/**
 * Internal dependencies
 */
export function Edit({ attributes, context, }) {
    const blockProps = useWooBlockProps(attributes);
    const [sku, setSku] = useEntityProp('postType', context.postType, 'sku');
    const { ref: skuRef } = useValidation('sku', async function skuValidator() {
        return undefined;
    }, [sku]);
    const inputControlId = useInstanceId(BaseControl, 'product_sku');
    return (createElement("div", { ...blockProps },
        createElement(BaseControl, { id: inputControlId, className: "fincommerce-product-form_inventory-sku", label: createInterpolateElement(__('Sku <description />', 'fincommerce'), {
                description: (createElement("span", { className: "fincommerce-product-form__optional-input" }, __('(STOCK KEEPING UNIT)', 'fincommerce'))),
            }) },
            createElement(InputControl, { ref: skuRef, id: inputControlId, name: 'fincommerce-product-sku', onChange: (nextValue) => {
                    setSku(nextValue ?? '');
                }, value: sku || '', disabled: attributes.disabled }))));
}
