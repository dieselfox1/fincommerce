"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeListItem = void 0;
const components_1 = require("@fincommerce/components");
const i18n_1 = require("@wordpress/i18n");
const components_2 = require("@wordpress/components");
const icons_1 = require("@wordpress/icons");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const not_filterable_icon_1 = __importDefault(require("./not-filterable-icon"));
const seen_icon_1 = __importDefault(require("../../icons/seen-icon"));
const VISIBLE_TEXT = (0, i18n_1.__)('Visible in product details', 'fincommerce');
const NOT_FILTERABLE_CUSTOM_ATTR_TEXT = (0, i18n_1.__)('Custom attribute. Customers can’t filter or search by it to find this product', 'fincommerce');
const AttributeListItem = ({ attribute, editLabel = (0, i18n_1.__)('Edit', 'fincommerce'), removeLabel = (0, i18n_1.__)('Remove attribute', 'fincommerce'), onDragStart, onDragEnd, onEditClick, onRemoveClick, }) => {
    return ((0, element_1.createElement)(components_1.ListItem, { className: "fincommerce-attribute-list-item", onDragStart: onDragStart, onDragEnd: onDragEnd },
        (0, element_1.createElement)("div", null, attribute.name),
        (0, element_1.createElement)("div", null,
            attribute.options
                .slice(0, attribute.options.length > 3 ? 2 : 3)
                .map((option) => ((0, element_1.createElement)(components_1.Tag, { key: option, label: option }))),
            attribute.options.length > 3 && ((0, element_1.createElement)(components_1.Tag, { label: (0, i18n_1.sprintf)(
                /* translators: %i: number of additional attribute values that are hidden */
                (0, i18n_1.__)('+ %d more', 'fincommerce'), attribute.options.length - 2) }))),
        (0, element_1.createElement)("div", { className: "fincommerce-attribute-list-item__actions" },
            attribute.id === 0 && ((0, element_1.createElement)(components_2.Tooltip
            // @ts-expect-error className is missing in TS, should remove this when it is included.
            , { 
                // @ts-expect-error className is missing in TS, should remove this when it is included.
                className: "fincommerce-attribute-list-item__actions-tooltip", position: "top center", text: NOT_FILTERABLE_CUSTOM_ATTR_TEXT },
                (0, element_1.createElement)("div", { className: "fincommerce-attribute-list-item__actions-icon-wrapper" },
                    (0, element_1.createElement)(not_filterable_icon_1.default, { className: "fincommerce-attribute-list-item__actions-icon-wrapper-icon" })))),
            attribute.visible && ((0, element_1.createElement)(components_2.Tooltip
            // @ts-expect-error className is missing in TS, should remove this when it is included.
            , { 
                // @ts-expect-error className is missing in TS, should remove this when it is included.
                className: "fincommerce-attribute-list-item__actions-tooltip", placement: "top", text: VISIBLE_TEXT },
                (0, element_1.createElement)("div", { className: "fincommerce-attribute-list-item__actions-icon-wrapper" },
                    (0, element_1.createElement)(seen_icon_1.default, { className: "fincommerce-attribute-list-item__actions-icon-wrapper-icon" })))),
            typeof onEditClick === 'function' && ((0, element_1.createElement)(components_2.Button, { variant: "tertiary", onClick: () => onEditClick(attribute) }, editLabel)),
            typeof onRemoveClick === 'function' && ((0, element_1.createElement)(components_2.Button, { icon: icons_1.closeSmall, label: removeLabel, onClick: () => onRemoveClick(attribute) })))));
};
exports.AttributeListItem = AttributeListItem;
