import { ListItem, Tag } from '@fincommerce/components';
import { sprintf, __ } from '@wordpress/i18n';
import { Button, Tooltip } from '@wordpress/components';
import { closeSmall } from '@wordpress/icons';
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import NotFilterableIcon from './not-filterable-icon';
import SeenIcon from '../../icons/seen-icon';
const VISIBLE_TEXT = __('Visible in product details', 'fincommerce');
const NOT_FILTERABLE_CUSTOM_ATTR_TEXT = __('Custom attribute. Customers can’t filter or search by it to find this product', 'fincommerce');
export const AttributeListItem = ({ attribute, editLabel = __('Edit', 'fincommerce'), removeLabel = __('Remove attribute', 'fincommerce'), onDragStart, onDragEnd, onEditClick, onRemoveClick, }) => {
    return (createElement(ListItem, { className: "fincommerce-attribute-list-item", onDragStart: onDragStart, onDragEnd: onDragEnd },
        createElement("div", null, attribute.name),
        createElement("div", null,
            attribute.options
                .slice(0, attribute.options.length > 3 ? 2 : 3)
                .map((option) => (createElement(Tag, { key: option, label: option }))),
            attribute.options.length > 3 && (createElement(Tag, { label: sprintf(
                /* translators: %i: number of additional attribute values that are hidden */
                __('+ %d more', 'fincommerce'), attribute.options.length - 2) }))),
        createElement("div", { className: "fincommerce-attribute-list-item__actions" },
            attribute.id === 0 && (createElement(Tooltip
            // @ts-expect-error className is missing in TS, should remove this when it is included.
            , { 
                // @ts-expect-error className is missing in TS, should remove this when it is included.
                className: "fincommerce-attribute-list-item__actions-tooltip", position: "top center", text: NOT_FILTERABLE_CUSTOM_ATTR_TEXT },
                createElement("div", { className: "fincommerce-attribute-list-item__actions-icon-wrapper" },
                    createElement(NotFilterableIcon, { className: "fincommerce-attribute-list-item__actions-icon-wrapper-icon" })))),
            attribute.visible && (createElement(Tooltip
            // @ts-expect-error className is missing in TS, should remove this when it is included.
            , { 
                // @ts-expect-error className is missing in TS, should remove this when it is included.
                className: "fincommerce-attribute-list-item__actions-tooltip", placement: "top", text: VISIBLE_TEXT },
                createElement("div", { className: "fincommerce-attribute-list-item__actions-icon-wrapper" },
                    createElement(SeenIcon, { className: "fincommerce-attribute-list-item__actions-icon-wrapper-icon" })))),
            typeof onEditClick === 'function' && (createElement(Button, { variant: "tertiary", onClick: () => onEditClick(attribute) }, editLabel)),
            typeof onRemoveClick === 'function' && (createElement(Button, { icon: closeSmall, label: removeLabel, onClick: () => onRemoveClick(attribute) })))));
};
