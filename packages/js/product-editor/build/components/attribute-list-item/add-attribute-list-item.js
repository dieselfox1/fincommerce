"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewAttributeListItem = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const components_2 = require("@fincommerce/components");
const element_1 = require("@wordpress/element");
const NewAttributeListItem = ({ label = (0, i18n_1.__)('Add attribute', 'fincommerce'), onClick, }) => {
    return ((0, element_1.createElement)(components_2.ListItem, { className: "fincommerce-add-attribute-list-item" },
        (0, element_1.createElement)(components_1.Button, { variant: "secondary", className: "fincommerce-add-attribute-list-item__add-button", onClick: onClick }, label)));
};
exports.NewAttributeListItem = NewAttributeListItem;
