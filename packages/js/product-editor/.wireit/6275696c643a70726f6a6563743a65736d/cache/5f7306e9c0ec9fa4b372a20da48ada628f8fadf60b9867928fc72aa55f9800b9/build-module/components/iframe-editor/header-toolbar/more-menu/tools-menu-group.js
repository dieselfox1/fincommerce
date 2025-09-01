/**
 * External dependencies
 */
import { MenuGroup } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { CopyAllContentMenuItem } from './copy-all-content-menu-item';
import { HelpMenuItem } from './help-menu-item';
export const ToolsMenuGroup = () => {
    return (createElement(MenuGroup, { label: __('Tools', 'fincommerce') },
        createElement(CopyAllContentMenuItem, null),
        createElement(HelpMenuItem, null)));
};
