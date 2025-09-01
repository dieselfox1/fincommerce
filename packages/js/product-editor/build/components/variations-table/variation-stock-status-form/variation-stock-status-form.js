"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariationStockStatusForm = VariationStockStatusForm;
const data_1 = require("@fincommerce/data");
const settings_1 = require("@fincommerce/settings");
const data_2 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const radio_field_1 = require("../../radio-field");
const MANAGE_STOCK_OPTION = 'fincommerce_manage_stock';
const STOCK_STATUS_OPTIONS = [
    {
        label: (0, i18n_1.__)('In stock', 'fincommerce'),
        value: 'instock',
    },
    {
        label: (0, i18n_1.__)('Out of stock', 'fincommerce'),
        value: 'outofstock',
    },
    {
        label: (0, i18n_1.__)('On backorder', 'fincommerce'),
        value: 'onbackorder',
    },
];
function VariationStockStatusForm({ initialValue, onSubmit, onCancel, }) {
    const [value, setValue] = (0, element_1.useState)({
        manage_stock: Boolean(initialValue?.manage_stock),
        stock_status: initialValue?.stock_status ?? '',
        stock_quantity: initialValue?.stock_quantity ?? 1,
    });
    const [errors, setErrors] = (0, element_1.useState)({});
    const { canManageStock, isLoadingManageStockOption } = (0, data_2.useSelect)((select) => {
        const { getOption, isResolving } = select(data_1.optionsStore);
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
            error = (0, i18n_1.__)('Stock quantity must be a positive number.', 'fincommerce');
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
        return (0, element_1.createInterpolateElement)(
        /* translators: <Link>: Learn more link opening tag. </Link>: Learn more link closing tag.*/
        (0, i18n_1.__)('Per your <Link>store settings</Link>, inventory management is <strong>disabled</strong>.', 'fincommerce'), {
            Link: (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            (0, element_1.createElement)("a", { href: (0, settings_1.getAdminLink)('admin.php?page=wc-settings&tab=products&section=inventory'), target: "_blank", rel: "noreferrer" })),
            strong: (0, element_1.createElement)("strong", null),
        });
    }
    function handleStockStatusRadioFieldChange(selected) {
        setValue((current) => ({ ...current, stock_status: selected }));
    }
    function handleStockQuantityInputControlChange(stock_quantity) {
        setValue((current) => ({ ...current, stock_quantity }));
    }
    return ((0, element_1.createElement)("form", { onSubmit: handleSubmit, className: "fincommerce-variation-stock-status-form", "aria-label": (0, i18n_1.__)('Variation stock status form', 'fincommerce'), noValidate: true },
        (0, element_1.createElement)("div", { className: "fincommerce-variation-stock-status-form__controls" },
            (0, element_1.createElement)(components_1.ToggleControl, { label: (0, i18n_1.__)('Track inventory', 'fincommerce'), disabled: isLoadingManageStockOption || !canManageStock, checked: value.manage_stock, onChange: handleTrackInventoryToggleChange, help: renderTrackInventoryToggleHelp() })),
        (0, element_1.createElement)("div", { className: "fincommerce-variation-stock-status-form__controls" }, value.manage_stock ? ((0, element_1.createElement)(components_1.__experimentalInputControl, { type: "number", min: 0, label: (0, i18n_1.__)('Available stock', 'fincommerce'), help: errors.stock_quantity, value: value.stock_quantity, onChange: handleStockQuantityInputControlChange, onBlur: validateStockQuantity, className: (0, clsx_1.default)({
                'has-error': errors.stock_quantity,
            }) })) : ((0, element_1.createElement)(radio_field_1.RadioField, { title: (0, i18n_1.__)('Stock status', 'fincommerce'), selected: value.stock_status, options: STOCK_STATUS_OPTIONS, onChange: handleStockStatusRadioFieldChange }))),
        (0, element_1.createElement)("div", { className: "fincommerce-variation-stock-status-form__actions" },
            (0, element_1.createElement)(components_1.Button, { variant: "tertiary", onClick: onCancel }, "Cancel"),
            (0, element_1.createElement)(components_1.Button, { variant: "primary", type: "submit" }, "Save"))));
}
