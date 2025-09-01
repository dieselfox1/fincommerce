import { optionsStore } from '@fincommerce/data';
import { getAdminLink } from '@fincommerce/settings';
import { useSelect } from '@wordpress/data';
import { createElement, createInterpolateElement, useState, } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { Button, ToggleControl, __experimentalInputControl as InputControl, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { RadioField } from '../../radio-field';
const MANAGE_STOCK_OPTION = 'fincommerce_manage_stock';
const STOCK_STATUS_OPTIONS = [
    {
        label: __('In stock', 'fincommerce'),
        value: 'instock',
    },
    {
        label: __('Out of stock', 'fincommerce'),
        value: 'outofstock',
    },
    {
        label: __('On backorder', 'fincommerce'),
        value: 'onbackorder',
    },
];
export function VariationStockStatusForm({ initialValue, onSubmit, onCancel, }) {
    const [value, setValue] = useState({
        manage_stock: Boolean(initialValue?.manage_stock),
        stock_status: initialValue?.stock_status ?? '',
        stock_quantity: initialValue?.stock_quantity ?? 1,
    });
    const [errors, setErrors] = useState({});
    const { canManageStock, isLoadingManageStockOption } = useSelect((select) => {
        const { getOption, isResolving } = select(optionsStore);
        return {
            canManageStock: getOption(MANAGE_STOCK_OPTION) === 'yes',
            isLoadingManageStockOption: isResolving('getOption', [
                MANAGE_STOCK_OPTION,
            ]),
        };
    }, []);
    function validateStockQuantity() {
        let error;
        if (value.manage_stock &&
            value.stock_quantity &&
            Number.parseInt(value.stock_quantity, 10) < 0) {
            error = __('Stock quantity must be a positive number.', 'fincommerce');
        }
        setErrors({ stock_quantity: error });
        return !error;
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (validateStockQuantity()) {
            onSubmit?.(value);
        }
    }
    function handleTrackInventoryToggleChange(isChecked) {
        setValue((current) => ({ ...current, manage_stock: isChecked }));
    }
    function renderTrackInventoryToggleHelp() {
        if (isLoadingManageStockOption || canManageStock)
            return undefined;
        return createInterpolateElement(
        /* translators: <Link>: Learn more link opening tag. </Link>: Learn more link closing tag.*/
        __('Per your <Link>store settings</Link>, inventory management is <strong>disabled</strong>.', 'fincommerce'), {
            Link: (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            createElement("a", { href: getAdminLink('admin.php?page=wc-settings&tab=products&section=inventory'), target: "_blank", rel: "noreferrer" })),
            strong: createElement("strong", null),
        });
    }
    function handleStockStatusRadioFieldChange(selected) {
        setValue((current) => ({ ...current, stock_status: selected }));
    }
    function handleStockQuantityInputControlChange(stock_quantity) {
        setValue((current) => ({ ...current, stock_quantity }));
    }
    return (createElement("form", { onSubmit: handleSubmit, className: "fincommerce-variation-stock-status-form", "aria-label": __('Variation stock status form', 'fincommerce'), noValidate: true },
        createElement("div", { className: "fincommerce-variation-stock-status-form__controls" },
            createElement(ToggleControl, { label: __('Track inventory', 'fincommerce'), disabled: isLoadingManageStockOption || !canManageStock, checked: value.manage_stock, onChange: handleTrackInventoryToggleChange, help: renderTrackInventoryToggleHelp() })),
        createElement("div", { className: "fincommerce-variation-stock-status-form__controls" }, value.manage_stock ? (createElement(InputControl, { type: "number", min: 0, label: __('Available stock', 'fincommerce'), help: errors.stock_quantity, value: value.stock_quantity, onChange: handleStockQuantityInputControlChange, onBlur: validateStockQuantity, className: clsx({
                'has-error': errors.stock_quantity,
            }) })) : (createElement(RadioField, { title: __('Stock status', 'fincommerce'), selected: value.stock_status, options: STOCK_STATUS_OPTIONS, onChange: handleStockStatusRadioFieldChange }))),
        createElement("div", { className: "fincommerce-variation-stock-status-form__actions" },
            createElement(Button, { variant: "tertiary", onClick: onCancel }, "Cancel"),
            createElement(Button, { variant: "primary", type: "submit" }, "Save"))));
}
