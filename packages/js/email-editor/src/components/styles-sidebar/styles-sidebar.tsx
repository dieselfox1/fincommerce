/**
 * External dependencies
 */
import { memo } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { useSelect } from '@finpress/data';
import { styles } from '@finpress/icons';
// eslint-disable-next-line @fincommerce/dependency-group
import {
	// @ts-expect-error Type for PluginSidebar is missing in @types/finpress__editor
	PluginSidebar,
	// @ts-expect-error Type for PluginSidebarMoreMenuItem is missing in @types/finpress__editor
	PluginSidebarMoreMenuItem,
} from '@finpress/editor';

/**
 * Internal dependencies
 */
import { storeName } from '../../store';
import {
	ScreenTypography,
	ScreenTypographyElement,
	ScreenLayout,
	ScreenRoot,
	ScreenColors,
} from './screens';
import { Navigator } from './navigator';

export function RawStylesSidebar(): JSX.Element {
	const { userCanEditGlobalStyles } = useSelect( ( select ) => {
		const { canEdit } = select( storeName ).canUserEditGlobalEmailStyles();
		return {
			userCanEditGlobalStyles: canEdit,
		};
	}, [] );

	return (
		userCanEditGlobalStyles && (
			<>
				<PluginSidebarMoreMenuItem
					target="email-styles-sidebar"
					icon={ styles }
				>
					{ __( 'Email styles', 'fincommerce' ) }
				</PluginSidebarMoreMenuItem>
				<PluginSidebar
					name="email-styles-sidebar"
					icon={ styles }
					title={ __( 'Styles', 'fincommerce' ) }
					className="fincommerce-email-editor-styles-panel"
					header={ __( 'Styles', 'fincommerce' ) }
				>
					<Navigator initialPath="/">
						<Navigator.Screen path="/">
							<ScreenRoot />
						</Navigator.Screen>

						<Navigator.Screen path="/typography">
							<ScreenTypography />
						</Navigator.Screen>

						<Navigator.Screen path="/typography/text">
							<ScreenTypographyElement element="text" />
						</Navigator.Screen>

						<Navigator.Screen path="/typography/link">
							<ScreenTypographyElement element="link" />
						</Navigator.Screen>

						<Navigator.Screen path="/typography/heading">
							<ScreenTypographyElement element="heading" />
						</Navigator.Screen>

						<Navigator.Screen path="/typography/button">
							<ScreenTypographyElement element="button" />
						</Navigator.Screen>

						<Navigator.Screen path="/colors">
							<ScreenColors />
						</Navigator.Screen>

						<Navigator.Screen path="/layout">
							<ScreenLayout />
						</Navigator.Screen>
					</Navigator>
				</PluginSidebar>
			</>
		)
	);
}

export const StylesSidebar = memo( RawStylesSidebar );
