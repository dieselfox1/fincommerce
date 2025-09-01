/**
 * External dependencies
 */
import { MenuGroup } from '@wordpress/components';
import { createElement, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ActionItem from '@wordpress/interface/build-module/components/action-item';
/**
 * Internal dependencies
 */
import { ToolsMenuGroup } from './tools-menu-group';
import { WritingMenu } from '../writing-menu';
import { MORE_MENU_ACTION_ITEM_SLOT_NAME } from '../../constants';
import { MoreMenuDropdown } from '../../../more-menu-dropdown';
export const MoreMenu = () => {
    return (createElement(MoreMenuDropdown, null, (onClose) => (createElement(Fragment, null,
        createElement(WritingMenu, null),
        createElement(ActionItem.Slot, { name: MORE_MENU_ACTION_ITEM_SLOT_NAME, label: __('Plugins', 'fincommerce'), as: MenuGroup, fillProps: { onClick: onClose } }),
        createElement(ToolsMenuGroup, null)))));
};
