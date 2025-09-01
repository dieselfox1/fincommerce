/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { Link } from '@fincommerce/components';
import { createElement, Fragment, createInterpolateElement, } from '@wordpress/element';
import { getSetting } from '@fincommerce/settings';
import { useInstanceId } from '@wordpress/compose';
import { BaseControl, __experimentalInputControl as InputControl, } from '@wordpress/components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { useEntityProp } from '@wordpress/core-data';
/**
 * Internal dependencies
 */
import { useValidation } from '../../../contexts/validation-context';
export function Edit({ attributes, clientId, }) {
    const blockProps = useWooBlockProps(attributes);
    const notifyLowStockAmount = getSetting('notifyLowStockAmount', 2);
    const [lowStockAmount, setLowStockAmount] = useEntityProp('postType', 'product', 'low_stock_amount');
    const id = useInstanceId(BaseControl, 'low_stock_amount');
    const { ref: lowStockAmountRef, error: lowStockAmountValidationError, validate: validateLowStockAmount, } = useValidation(`low_stock_amount-${clientId}`, async function stockQuantityValidator() {
        if (lowStockAmount && lowStockAmount < 0) {
            return {
                message: __('This field must be a positive number.', 'fincommerce'),
            };
        }
    }, [lowStockAmount]);
    return (createElement(Fragment, null,
        createElement("div", { ...blockProps },
            createElement("div", { className: "wp-block-columns" },
                createElement("div", { className: "wp-block-column" },
                    createElement(BaseControl, { id: id, label: __('Email me when stock reaches', 'fincommerce'), help: lowStockAmountValidationError ||
                            createInterpolateElement(__('Make sure to enable notifications in <link>store settings.</link>', 'fincommerce'), {
                                link: (createElement(Link, { href: `${getSetting('adminUrl')}admin.php?page=wc-settings&tab=products&section=inventory`, target: "_blank", type: "external" })),
                            }), className: lowStockAmountValidationError && 'has-error' },
                        createElement(InputControl, { id: id, ref: lowStockAmountRef, name: 'low_stock_amount', placeholder: sprintf(
                            // translators: Default quantity to notify merchants of low stock.
                            __('%d (store default)', 'fincommerce'), notifyLowStockAmount), onChange: (nextValue) => {
                                setLowStockAmount(parseInt(nextValue ?? '', 10));
                            }, onBlur: async () => await validateLowStockAmount(), value: lowStockAmount?.toString(), type: "number", min: 0 }))),
                createElement("div", { className: "wp-block-column" })))));
}
