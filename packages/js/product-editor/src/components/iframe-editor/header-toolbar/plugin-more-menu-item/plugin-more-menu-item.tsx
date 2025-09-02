/**
 * External dependencies
 */
import { compose } from '@finpress/compose';
import { MenuItem } from '@finpress/components';
import { withPluginContext } from '@finpress/plugins';
import ActionItem from '@finpress/interface/build-module/components/action-item';

/**
 * Internal dependencies
 */
import { MORE_MENU_ACTION_ITEM_SLOT_NAME } from '../../constants';

type PluginMoreMenuItemProps = {
	as?: React.ElementType;
	icon?: string | React.ReactNode;
};

export const PluginMoreMenuItem = compose(
	// @ts-expect-error The type defintion of withPluginContext is incorrect.
	withPluginContext( ( context, ownProps: PluginMoreMenuItemProps ) => {
		return {
			as: ownProps.as ?? MenuItem,
			icon: ownProps.icon || context.icon,
			name: MORE_MENU_ACTION_ITEM_SLOT_NAME,
		};
	} )
)( ActionItem );
