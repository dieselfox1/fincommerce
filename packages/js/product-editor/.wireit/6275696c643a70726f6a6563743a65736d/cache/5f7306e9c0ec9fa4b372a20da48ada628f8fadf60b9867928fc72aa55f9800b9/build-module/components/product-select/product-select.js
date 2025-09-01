/**
 * External dependencies
 */
import { createElement, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { BaseControl, Spinner } from '@wordpress/components';
import clsx from 'clsx';
/**
 * Internal dependencies
 */
import { FormattedPrice } from '../formatted-price';
import { ProductImage } from '../product-image';
import { ComboboxControl } from '../combobox-control';
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
    return (createElement("div", { className: "fincommerce-product-select__menu-item" },
        item.product && (createElement(ProductImage, { product: item.product, className: "fincommerce-product-select__menu-item-image" })),
        createElement("div", { className: "fincommerce-product-select__menu-item-content" },
            createElement("div", { className: "fincommerce-product-select__menu-item-title" }, item.label),
            item.product && (createElement(FormattedPrice, { product: item.product, className: "fincommerce-product-select__menu-item-description" })))));
}
export function ProductSelect({ className, label, help, placeholder, items = [], isLoading = false, filter, onSelect, }) {
    const [value, setValue] = useState('');
    /**
     * Map the items to the Combobox options.
     * Each option is an object with a label and value.
     * Both are strings.
     */
    const options = items?.map(mapItemToOption);
    const comboRef = useRef(null);
    // Label to link the input with the label.
    const [labelFor, setLabelFor] = useState('');
    useEffect(() => {
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
        help = (createElement("div", { className: "fincommerce-product-combobox-help" }, __('Search for products', 'fincommerce')));
        if (isLoading) {
            help = (createElement("div", { className: "fincommerce-product-combobox-help" },
                createElement(Spinner, null),
                __('Loading…', 'fincommerce')));
        }
    }
    return (createElement("div", { className: clsx('fincommerce-product-select', {
            'no-items': !options.length,
        }, className) },
        createElement(BaseControl, { label: label, help: help, id: labelFor },
            createElement(ComboboxControl, { className: "fincommerce-product-combobox", allowReset: false, options: options, value: value, ref: comboRef, onChange: (newValue) => {
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
