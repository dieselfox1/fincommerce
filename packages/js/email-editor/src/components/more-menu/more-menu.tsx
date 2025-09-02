/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useViewportMatch } from '@finpress/compose';
import { displayShortcut } from '@finpress/keycodes';
import { PreferenceToggleMenuItem } from '@finpress/preferences';

/**
 * Internal dependencies
 */
import { ViewMoreMenuGroup } from '../../private-apis';
import { storeName } from '../../store';

export const MoreMenu = () => {
	const isLargeViewport = useViewportMatch( 'large' );

	return (
		<>
			{ isLargeViewport && (
				<ViewMoreMenuGroup>
					<PreferenceToggleMenuItem
						scope={ storeName }
						name="fullscreenMode"
						label={ __( 'Fullscreen mode', 'fincommerce' ) }
						info={ __(
							'Show and hide the admin user interface',
							'fincommerce'
						) }
						messageActivated={ __(
							'Fullscreen mode activated.',
							'fincommerce'
						) }
						messageDeactivated={ __(
							'Fullscreen mode deactivated.',
							'fincommerce'
						) }
						shortcut={ displayShortcut.secondary( 'f' ) }
					/>
				</ViewMoreMenuGroup>
			) }
		</>
	);
};
