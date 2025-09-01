"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReorderProductsModal = ReorderProductsModal;
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const clsx_1 = __importDefault(require("clsx"));
const use_draggable_1 = require("../../hooks/use-draggable");
const add_products_modal_1 = require("./add-products-modal");
function ReorderProductsModal({ products, onSubmit, onClose, }) {
    const [selectedProducts, setSelectedProducts] = (0, element_1.useState)([
        ...products,
    ]);
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit([...selectedProducts]);
    }
    function handleCancelClick() {
        onClose();
    }
    const { container, draggable, handler } = (0, use_draggable_1.useDraggable)({
        onSort: setSelectedProducts,
    });
    return ((0, element_1.createElement)(components_1.Modal, { title: (0, i18n_1.__)('Reorder products in this group', 'fincommerce'), className: "fincommerce-reorder-products-modal", onRequestClose: onClose },
        (0, element_1.createElement)("form", { noValidate: true, onSubmit: handleSubmit, className: "fincommerce-add-products-modal__form" },
            (0, element_1.createElement)("fieldset", { className: "fincommerce-add-products-modal__form-group" },
                (0, element_1.createElement)("legend", { className: "fincommerce-add-products-modal__form-group-title" }, (0, i18n_1.__)('Click and drag to reorder on the product page.', 'fincommerce')),
                Boolean(selectedProducts.length) && ((0, element_1.createElement)("ul", { ...container, className: (0, clsx_1.default)('fincommerce-add-products-modal__list', container.className) }, selectedProducts.map((item) => ((0, element_1.createElement)("li", { ...draggable, key: item.id, className: "fincommerce-add-products-modal__list-item" },
                    (0, element_1.createElement)(components_1.Button, { ...handler, icon: icons_1.dragHandle, variant: "tertiary", type: "button", "aria-label": (0, i18n_1.__)('Sortable handler', 'fincommerce') }),
                    (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__list-item-image", style: (0, add_products_modal_1.getProductImageStyle)(item) }),
                    (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__list-item-content" },
                        (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__list-item-title" }, item.name),
                        (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__list-item-description" }, item.sku)))))))),
            (0, element_1.createElement)("div", { className: "fincommerce-add-products-modal__actions" },
                (0, element_1.createElement)(components_1.Button, { variant: "tertiary", type: "button", onClick: handleCancelClick }, (0, i18n_1.__)('Cancel', 'fincommerce')),
                (0, element_1.createElement)(components_1.Button, { variant: "primary", type: "submit" }, (0, i18n_1.__)('Done', 'fincommerce'))))));
}
