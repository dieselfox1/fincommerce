/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { ListItem } from '@fincommerce/components';
import { createElement } from '@wordpress/element';
export const NewAttributeListItem = ({ label = __('Add attribute', 'fincommerce'), onClick, }) => {
    return (createElement(ListItem, { className: "fincommerce-add-attribute-list-item" },
        createElement(Button, { variant: "secondary", className: "fincommerce-add-attribute-list-item__add-button", onClick: onClick }, label)));
};
