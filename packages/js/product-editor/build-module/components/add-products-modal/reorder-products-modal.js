import { Button, Modal } from '@wordpress/components';
import { createElement, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { dragHandle } from '@wordpress/icons';
import clsx from 'clsx';
import { useDraggable } from '../../hooks/use-draggable';
import { getProductImageStyle } from './add-products-modal';
export function ReorderProductsModal({ products, onSubmit, onClose, }) {
    const [selectedProducts, setSelectedProducts] = useState([
        ...products,
    ]);
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit([...selectedProducts]);
    }
    function handleCancelClick() {
        onClose();
    }
    const { container, draggable, handler } = useDraggable({
        onSort: setSelectedProducts,
    });
    return (createElement(Modal, { title: __('Reorder products in this group', 'fincommerce'), className: "fincommerce-reorder-products-modal", onRequestClose: onClose },
        createElement("form", { noValidate: true, onSubmit: handleSubmit, className: "fincommerce-add-products-modal__form" },
            createElement("fieldset", { className: "fincommerce-add-products-modal__form-group" },
                createElement("legend", { className: "fincommerce-add-products-modal__form-group-title" }, __('Click and drag to reorder on the product page.', 'fincommerce')),
                Boolean(selectedProducts.length) && (createElement("ul", { ...container, className: clsx('fincommerce-add-products-modal__list', container.className) }, selectedProducts.map((item) => (createElement("li", { ...draggable, key: item.id, className: "fincommerce-add-products-modal__list-item" },
                    createElement(Button, { ...handler, icon: dragHandle, variant: "tertiary", type: "button", "aria-label": __('Sortable handler', 'fincommerce') }),
                    createElement("div", { className: "fincommerce-add-products-modal__list-item-image", style: getProductImageStyle(item) }),
                    createElement("div", { className: "fincommerce-add-products-modal__list-item-content" },
                        createElement("div", { className: "fincommerce-add-products-modal__list-item-title" }, item.name),
                        createElement("div", { className: "fincommerce-add-products-modal__list-item-description" }, item.sku)))))))),
            createElement("div", { className: "fincommerce-add-products-modal__actions" },
                createElement(Button, { variant: "tertiary", type: "button", onClick: handleCancelClick }, __('Cancel', 'fincommerce')),
                createElement(Button, { variant: "primary", type: "submit" }, __('Done', 'fincommerce'))))));
}
