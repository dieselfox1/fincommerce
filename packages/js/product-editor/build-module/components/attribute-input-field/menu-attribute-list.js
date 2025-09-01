/**
 * External dependencies
 */
import { sprintf, __ } from '@wordpress/i18n';
import { plus } from '@wordpress/icons';
import { Icon } from '@wordpress/components';
import { createElement, Fragment } from '@wordpress/element';
import { __experimentalSelectControlMenuItem as MenuItem } from '@fincommerce/components';
function isNewAttributeListItem(attribute) {
    return attribute.id === -99;
}
function sanitizeSlugName(slug) {
    return slug && slug.startsWith('pa_') ? slug.substring(3) : '';
}
export const MenuAttributeList = ({ disabledAttributeMessage = '', renderItems, highlightedIndex, getItemProps, }) => {
    if (renderItems.length > 0) {
        return (createElement(Fragment, null, renderItems.map((item, index) => (createElement(MenuItem, { key: item.id, index: index, isActive: highlightedIndex === index, item: item, getItemProps: (options) => ({
                ...getItemProps(options),
                disabled: item.isDisabled || undefined,
            }), tooltipText: item.isDisabled
                ? disabledAttributeMessage
                : sanitizeSlugName(item.slug) }, isNewAttributeListItem(item) ? (createElement("div", { className: "fincommerce-attribute-input-field__add-new" },
            createElement(Icon, { icon: plus, size: 20, className: "fincommerce-attribute-input-field__add-new-icon" }),
            createElement("span", null, sprintf(
            /* translators: The name of the new attribute term to be created */
            __('Create "%s"', 'fincommerce'), item.name)))) : (item.name))))));
    }
    return (createElement("div", { className: "fincommerce-attribute-input-field__no-results" }, __('Nothing yet. Type to create.', 'fincommerce')));
};
