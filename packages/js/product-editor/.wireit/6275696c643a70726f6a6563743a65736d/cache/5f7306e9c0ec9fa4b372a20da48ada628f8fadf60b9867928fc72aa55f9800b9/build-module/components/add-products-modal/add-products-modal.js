/**
 * External dependencies
 */
import { useEffect } from 'react';
import { Button, Modal, Spinner } from '@wordpress/components';
import { resolveSelect } from '@wordpress/data';
import { createElement, Fragment, useContext, useCallback, useState, } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { __experimentalSelectControl as SelectControl, __experimentalSelectControlMenu as Menu, __experimentalSelectControlMenuItem as MenuItem, useAsyncFilter, } from '@fincommerce/components';
import { CurrencyContext } from '@fincommerce/currency';
import { productsStore } from '@fincommerce/data';
export function getProductImageStyle(product) {
    return product.images.length > 0
        ? {
            backgroundImage: `url(${product.images[0].src})`,
        }
        : undefined;
}
export function AddProductsModal({ initialValue, onSubmit, onClose, }) {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit([...selectedProducts]);
    }
    function handleCancelClick() {
        onClose();
    }
    const filter = useCallback(async (search = '') => {
        setProducts([]);
        return resolveSelect(productsStore)
            .getProducts({
            search,
            orderby: 'title',
            order: 'asc',
            exclude: [...initialValue, ...selectedProducts].map((product) => product.id),
        })
            .then((response) => {
            setProducts(response);
            return response;
        });
    }, [selectedProducts]);
    const { isFetching, ...selectProps } = useAsyncFilter({
        filter,
    });
    useEffect(function preloadProducts() {
        filter();
    }, [initialValue, selectedProducts]);
    function handleSelect(value) {
        setSelectedProducts((current) => [...current, value]);
    }
    const { formatAmount } = useContext(CurrencyContext);
    function removeProductHandler(product) {
        return function handleRemoveClick() {
            setSelectedProducts((current) => current.filter((item) => item.id !== product.id));
        };
    }
    return (createElement(Modal, { title: __('Add products to this group', 'fincommerce'), className: "fincommerce-add-products-modal", onRequestClose: onClose },
        createElement("form", { noValidate: true, onSubmit: handleSubmit, className: "fincommerce-add-products-modal__form" },
            createElement("fieldset", { className: "fincommerce-add-products-modal__form-group" },
                createElement("legend", { className: "fincommerce-add-products-modal__form-group-title" }, __('Add and manage products in this group to let customers purchase them all in one go.', 'fincommerce')),
                createElement("div", { className: "fincommerce-add-products-modal__form-group-content" },
                    createElement(SelectControl, { ...selectProps, items: products, placeholder: __('Search for products', 'fincommerce'), label: "", selected: null, onSelect: handleSelect, __experimentalOpenMenuOnFocus: true }, ({ items, isOpen, highlightedIndex, getMenuProps, getItemProps, }) => (createElement(Menu, { isOpen: isOpen, getMenuProps: getMenuProps, className: "fincommerce-add-products-modal__menu" }, isFetching ? (createElement("div", { className: "fincommerce-add-products-modal__menu-loading" },
                        createElement(Spinner, null))) : (items.map((item, index) => (createElement(MenuItem, { key: item.id, index: index, isActive: highlightedIndex === index, item: item, getItemProps: (options) => ({
                            ...getItemProps(options),
                            className: 'fincommerce-add-products-modal__menu-item',
                        }) },
                        createElement(Fragment, null,
                            createElement("div", { className: "fincommerce-add-products-modal__menu-item-image", style: getProductImageStyle(item) }),
                            createElement("div", { className: "fincommerce-add-products-modal__menu-item-content" },
                                createElement("div", { className: "fincommerce-add-products-modal__menu-item-title" }, item.name),
                                Boolean(item.price) && (createElement("div", { className: "fincommerce-add-products-modal__menu-item-description" }, formatAmount(item.price))))))))))))),
                Boolean(selectedProducts.length) && (createElement("ul", { className: "fincommerce-add-products-modal__list" }, selectedProducts.map((item) => (createElement("li", { key: item.id, className: "fincommerce-add-products-modal__list-item" },
                    createElement("div", { className: "fincommerce-add-products-modal__list-item-image", style: getProductImageStyle(item) }),
                    createElement("div", { className: "fincommerce-add-products-modal__list-item-content" },
                        createElement("div", { className: "fincommerce-add-products-modal__list-item-title" }, item.name),
                        createElement("div", { className: "fincommerce-add-products-modal__list-item-description" }, item.sku)),
                    createElement("div", { className: "fincommerce-add-products-modal__list-item-actions" },
                        createElement(Button, { type: "button", variant: "tertiary", icon: closeSmall, "aria-label": __('Remove product', 'fincommerce'), onClick: removeProductHandler(item) })))))))),
            createElement("div", { className: "fincommerce-add-products-modal__actions" },
                createElement(Button, { variant: "tertiary", type: "button", onClick: handleCancelClick }, __('Cancel', 'fincommerce')),
                createElement(Button, { variant: "primary", type: "submit" }, __('Add', 'fincommerce'))))));
}
