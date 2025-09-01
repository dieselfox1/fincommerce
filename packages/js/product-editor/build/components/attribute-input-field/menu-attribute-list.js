"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuAttributeList = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const components_2 = require("@fincommerce/components");
function isNewAttributeListItem(attribute) {
    return attribute.id === -99;
}
function sanitizeSlugName(slug) {
    return slug && slug.startsWith('pa_') ? slug.substring(3) : '';
}
const MenuAttributeList = ({ disabledAttributeMessage = '', renderItems, highlightedIndex, getItemProps, }) => {
    if (renderItems.length > 0) {
        return ((0, element_1.createElement)(element_1.Fragment, null, renderItems.map((item, index) => ((0, element_1.createElement)(components_2.__experimentalSelectControlMenuItem, { key: item.id, index: index, isActive: highlightedIndex === index, item: item, getItemProps: (options) => ({
                ...getItemProps(options),
                disabled: item.isDisabled || undefined,
            }), tooltipText: item.isDisabled
                ? disabledAttributeMessage
                : sanitizeSlugName(item.slug) }, isNewAttributeListItem(item) ? ((0, element_1.createElement)("div", { className: "fincommerce-attribute-input-field__add-new" },
            (0, element_1.createElement)(components_1.Icon, { icon: icons_1.plus, size: 20, className: "fincommerce-attribute-input-field__add-new-icon" }),
            (0, element_1.createElement)("span", null, (0, i18n_1.sprintf)(
            /* translators: The name of the new attribute term to be created */
            (0, i18n_1.__)('Create "%s"', 'fincommerce'), item.name)))) : (item.name))))));
    }
    return ((0, element_1.createElement)("div", { className: "fincommerce-attribute-input-field__no-results" }, (0, i18n_1.__)('Nothing yet. Type to create.', 'fincommerce')));
};
exports.MenuAttributeList = MenuAttributeList;
