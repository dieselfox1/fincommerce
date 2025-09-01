"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductList = ProductList;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const navigation_1 = require("@fincommerce/navigation");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const formatted_price_1 = require("../formatted-price");
const product_image_1 = require("../product-image");
function ProductList({ products, onRemove, onEdit, onPreview, className, ...props }) {
    function nameLinkClickHandler(product) {
        return function handleNameLinkClick() {
            if (onEdit) {
                onEdit(product);
            }
        };
    }
    function previewLinkClickHandler(product) {
        return function handlePreviewLinkClick() {
            if (onPreview) {
                onPreview(product);
            }
        };
    }
    function removeClickHandler(product) {
        return function handleRemoveClick() {
            if (onRemove) {
                onRemove(product);
            }
        };
    }
    return ((0, element_1.createElement)("div", { ...props, className: (0, clsx_1.default)('fincommerce-product-list', className) },
        (0, element_1.createElement)("div", { role: "table" },
            (0, element_1.createElement)("div", { role: "rowgroup" },
                (0, element_1.createElement)("div", { role: "rowheader" },
                    (0, element_1.createElement)("div", { role: "columnheader" }, (0, i18n_1.__)('Product', 'fincommerce')),
                    (0, element_1.createElement)("div", { role: "columnheader", "aria-label": (0, i18n_1.__)('Actions', 'fincommerce') }))),
            (0, element_1.createElement)("div", { role: "rowgroup" }, products.map((product) => ((0, element_1.createElement)("div", { role: "row", key: product.id },
                (0, element_1.createElement)("div", { role: "cell" },
                    (0, element_1.createElement)(product_image_1.ProductImage, { product: product, className: "fincommerce-product-list__product-image" }),
                    (0, element_1.createElement)("div", { className: "fincommerce-product-list__product-info" },
                        (0, element_1.createElement)("a", { className: "fincommerce-product-list__product-name", href: (0, navigation_1.getNewPath)({}, `/product/${product.id}`, {}), target: "_blank", rel: "noreferrer", onClick: nameLinkClickHandler(product) }, product.name),
                        (0, element_1.createElement)(formatted_price_1.FormattedPrice, { product: product, className: "fincommerce-product-list__product-price" }))),
                (0, element_1.createElement)("div", { role: "cell", className: "fincommerce-product-list__actions" },
                    (0, element_1.createElement)(components_1.Button, { icon: icons_1.external, "aria-label": (0, i18n_1.__)('See product page', 'fincommerce'), href: product.permalink, target: "_blank", rel: "noreferrer", onClick: previewLinkClickHandler(product) }),
                    (0, element_1.createElement)(components_1.Button, { icon: icons_1.closeSmall, "aria-label": (0, i18n_1.__)('Remove product', 'fincommerce'), onClick: removeClickHandler(product) })))))))));
}
