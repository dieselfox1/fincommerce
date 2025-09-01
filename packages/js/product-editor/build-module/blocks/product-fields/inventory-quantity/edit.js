/**
 * External dependencies
 */
import { useWooBlockProps } from '@fincommerce/block-templates';
import { useInstanceId } from '@wordpress/compose';
import { useEntityProp } from '@wordpress/core-data';
import { createElement, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { BaseControl, __experimentalInputControl as InputControl, } from '@wordpress/components';
import { useValidation } from '../../../contexts/validation-context';
export function Edit({ attributes, clientId, context, }) {
    const blockProps = useWooBlockProps(attributes);
    const [manageStock] = useEntityProp('postType', context.postType, 'manage_stock');
    const [stockQuantity, setStockQuantity] = useEntityProp('postType', context.postType, 'stock_quantity');
    const stockQuantityId = useInstanceId(BaseControl, 'product_stock_quantity');
    const { ref: stockQuantityRef, error: stockQuantityValidationError, validate: validateStockQuantity, } = useValidation(`stock_quantity-${clientId}`, async function stockQuantityValidator() {
        if (manageStock && stockQuantity && stockQuantity < 0) {
            return {
                message: __('Stock quantity must be a positive number.', 'fincommerce'),
            };
        }
    }, [manageStock, stockQuantity]);
    useEffect(() => {
        if (manageStock && stockQuantity === null) {
            setStockQuantity(1);
        }
    }, [manageStock, stockQuantity]);
    return (createElement("div", { ...blockProps },
        createElement("div", { className: "wp-block-columns" },
            createElement("div", { className: "wp-block-column" },
                createElement(BaseControl, { id: stockQuantityId, className: stockQuantityValidationError && 'has-error', help: stockQuantityValidationError ?? '' },
                    createElement(InputControl, { id: stockQuantityId, name: "stock_quantity", ref: stockQuantityRef, label: __('Available stock', 'fincommerce'), value: stockQuantity?.toString(), onChange: (value) => {
                            setStockQuantity(parseInt(value ?? '', 10));
                        }, onBlur: () => validateStockQuantity(), type: "number", min: 0 }))),
            createElement("div", { className: "wp-block-column" }))));
}
