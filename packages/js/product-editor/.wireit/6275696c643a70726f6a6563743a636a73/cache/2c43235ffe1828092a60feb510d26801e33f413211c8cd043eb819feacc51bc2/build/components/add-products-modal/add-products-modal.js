"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductImageStyle = getProductImageStyle;
exports.AddProductsModal = AddProductsModal;
/**
 * External dependencies
 */
const react_1 = require("react");
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const components_2 = require("@fincommerce/components");
const currency_1 = require("@fincommerce/currency");
const data_2 = require("@fincommerce/data");
function getProductImageStyle(product) {
    return product.images.length > 0
        ? {
            backgroundImage: `url(${product.images[0].src})`,
        }
        : undefined;
}
function AddProductsModal({ initialValue, onSubmit, onClose, }) {
    const [products, setProducts] = (0, element_1.useState)([]);
    const [selectedProducts, setSelectedProducts] = (0, element_1.useState)([]);
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit([...selectedProducts]);
    }
    function handleCancelClick() {
        onClose();
    }
    const filter = (0, element_1.useCallback)(async (search = '') => {
        setProducts([]);
        return (0, data_1.resolveSelect)(data_2.productsStore)
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
    const { isFetching, ...selectProps } = (0, components_2.useAsyncFilter)({
        filter,
    });
    (0, react_1.useEffect)(function preloadProducts() {
        filter();
    }, [initialValue, selectedProducts]);
    function handleSelect(value) {
        setSelectedProducts((current) => [...current, value]);
    }
    const { formatAmount } = (0, element_1.useContext)(currency_1.CurrencyContext);
    function removeProductHandler(product) {
        return function handleRemoveClick() {
            setSelectedProducts((current) => current.filter((item) => item.id !== product.id));
        };
    }
    return ((0, element_1.createElement)(components_1.Modal, { title: (0, i18n_1.__)('Add products to this group', 'fincommerce'), className: "fincommerce-add-products-modal", onRequestClose: onClose },
        (0, element_1.createElement)("form", { noValidate: true, onSubmit: handleSubmit, className: "fincommerce-add-products-modal__form" },
            (0, element_1.createElement)("fieldset", { className: "fincommerce-add-products-modal__form-group" },
                (0, element_1.createElement)("legend", { className: "fincommerce-add-products-modal__form-group-title" }, (0, i18n_1.__)('Add and manage products in this group to let customers purchase them all in one go.', 'fincommerce')),
                (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__form-group-content" },
                    (0, element_1.createElement)(components_2.__experimentalSelectControl, { ...selectProps, items: products, placeholder: (0, i18n_1.__)('Search for products', 'fincommerce'), label: "", selected: null, onSelect: handleSelect, __experimentalOpenMenuOnFocus: true }, ({ items, isOpen, highlightedIndex, getMenuProps, getItemProps, }) => ((0, element_1.createElement)(components_2.__experimentalSelectControlMenu, { isOpen: isOpen, getMenuProps: getMenuProps, className: "fincommerce-add-products-modal__menu" }, isFetching ? ((0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__menu-loading" },
                        (0, element_1.createElement)(components_1.Spinner, null))) : (items.map((item, index) => ((0, element_1.createElement)(components_2.__experimentalSelectControlMenuItem, { key: item.id, index: index, isActive: highlightedIndex === index, item: item, getItemProps: (options) => ({
                            ...getItemProps(options),
                            className: 'fincommerce-add-products-modal__menu-item',
                        }) },
                        (0, element_1.createElement)(element_1.Fragment, null,
                            (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__menu-item-image", style: getProductImageStyle(item) }),
                            (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__menu-item-content" },
                                (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__menu-item-title" }, item.name),
                                Boolean(item.price) && ((0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__menu-item-description" }, formatAmount(item.price))))))))))))),
                Boolean(selectedProducts.length) && ((0, element_1.createElement)("ul", { className: "fincommerce-add-products-modal__list" }, selectedProducts.map((item) => ((0, element_1.createElement)("li", { key: item.id, className: "fincommerce-add-products-modal__list-item" },
                    (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__list-item-image", style: getProductImageStyle(item) }),
                    (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__list-item-content" },
                        (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__list-item-title" }, item.name),
                        (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__list-item-description" }, item.sku)),
                    (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__list-item-actions" },
                        (0, element_1.createElement)(components_1.Button, { type: "button", variant: "tertiary", icon: icons_1.closeSmall, "aria-label": (0, i18n_1.__)('Remove product', 'fincommerce'), onClick: removeProductHandler(item) })))))))),
            (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__actions" },
                (0, element_1.createElement)(components_1.Button, { variant: "tertiary", type: "button", onClick: handleCancelClick }, (0, i18n_1.__)('Cancel', 'fincommerce')),
                (0, element_1.createElement)(components_1.Button, { variant: "primary", type: "submit" }, (0, i18n_1.__)('Add', 'fincommerce'))))));
}
