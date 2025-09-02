/**
 * External dependencies
 */
import { MenuGroup } from '@finpress/components';
import { createElement } from '@finpress/element';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { CopyAllContentMenuItem } from './copy-all-content-menu-item';
import { HelpMenuItem } from './help-menu-item';

export const ToolsMenuGroup = () => {
	return (
		<MenuGroup label={ __( 'Tools', 'fincommerce' ) }>
			<CopyAllContentMenuItem />
			<HelpMenuItem />
		</MenuGroup>
	);
};
