"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSelect = ProductSelect;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const formatted_price_1 = require("../formatted-price");
const product_image_1 = require("../product-image");
const combobox_control_1 = require("../combobox-control");
/**
 * Map the product item to the Combobox core option.
 *
 * @param {Product} attr - Product item.
 * @return {ComboboxControlOption} Combobox option.
 */
function mapItemToOption(attr) {
    return {
        label: attr.name,
        value: `attr-${attr.id}`,
        product: attr,
    };
}
/**
 * ComboboxControlOption component.
 *
 * @return {JSX.Element} Component item.
 */
function ComboboxControlOption(props) {
    const { item } = props;
    return ((0, element_1.createElement)("div", { className: "fincommerce-product-select__menu-item" },
        item.product && ((0, element_1.createElement)(product_image_1.ProductImage, { product: item.product, className: "fincommerce-product-select__menu-item-image" })),
        (0, element_1.createElement)("div", { className: "fincommerce-product-select__menu-item-content" },
            (0, element_1.createElement)("div", { className: "fincommerce-product-select__menu-item-title" }, item.label),
            item.product && ((0, element_1.createElement)(formatted_price_1.FormattedPrice, { product: item.product, className: "fincommerce-product-select__menu-item-description" })))));
}
function ProductSelect({ className, label, help, placeholder, items = [], isLoading = false, filter, onSelect, }) {
    const [value, setValue] = (0, element_1.useState)('');
    /**
     * Map the items to the Combobox options.
     * Each option is an object with a label and value.
     * Both are strings.
     */
    const options = items?.map(mapItemToOption);
    const comboRef = (0, element_1.useRef)(null);
    // Label to link the input with the label.
    const [labelFor, setLabelFor] = (0, element_1.useState)('');
    (0, element_1.useEffect)(() => {
        if (!comboRef?.current) {
            return;
        }
        /*
         * Hack to set the base control ID,
         * to link the label with the input,
         * picking the input ID from the ComboboxControl.
         */
        const id = comboRef.current.getAttribute('id');
        if (comboRef.current && typeof id === 'string') {
            setLabelFor(id);
        }
    }, []);
    if (placeholder && !help) {
        help = placeholder;
    }
    if (!help) {
        help = ((0, element_1.createElement)("div", { className: "fincommerce-product-combobox-help" }, (0, i18n_1.__)('Search for products', 'fincommerce')));
        if (isLoading) {
            help = ((0, element_1.createElement)("div", { className: "fincommerce-product-combobox-help" },
                (0, element_1.createElement)(components_1.Spinner, null),
                (0, i18n_1.__)('Loading…', 'fincommerce')));
        }
    }
    return ((0, element_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-product-select', {
            'no-items': !options.length,
        }, className) },
        (0, element_1.createElement)(components_1.BaseControl, { label: label, help: help, id: labelFor },
            (0, element_1.createElement)(combobox_control_1.ComboboxControl, { className: "fincommerce-product-combobox", allowReset: false, options: options, value: value, ref: comboRef, onChange: (newValue) => {
                    if (!newValue) {
                        return;
                    }
                    const selectedProduct = items?.find((item) => item.id ===
                        Number(newValue.replace('attr-', '')));
                    if (!selectedProduct) {
                        return;
                    }
                    if (onSelect) {
                        onSelect(selectedProduct);
                    }
                }, onFilterValueChange: (searchValue) => {
                    setValue(searchValue);
                    filter(searchValue);
                }, __experimentalRenderItem: ComboboxControlOption }))));
}
