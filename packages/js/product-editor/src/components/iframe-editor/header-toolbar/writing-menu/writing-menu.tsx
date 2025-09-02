/**
 * External dependencies
 */
import { useDispatch } from '@finpress/data';
import { MenuGroup } from '@finpress/components';
import { __ } from '@finpress/i18n';
import { useViewportMatch } from '@finpress/compose';
import { createElement } from '@finpress/element';
import {
	PreferenceToggleMenuItem,
	store as preferencesStore,
	// @ts-expect-error missing types.
} from '@finpress/preferences';

export function WritingMenu() {
	const { set: setPreference } = useDispatch( preferencesStore );

	const turnOffDistractionFree = () => {
		setPreference( 'core', 'distractionFree', false );
	};

	const isLargeViewport = useViewportMatch( 'medium' );
	if ( ! isLargeViewport ) {
		return null;
	}

	return (
		<MenuGroup label={ __( 'View', 'fincommerce' ) }>
			<PreferenceToggleMenuItem
				scope="core"
				name="fixedToolbar"
				onToggle={ turnOffDistractionFree }
				label={ __( 'Top toolbar', 'fincommerce' ) }
				info={ __(
					'Access all block and document tools in a single place',
					'fincommerce'
				) }
				messageActivated={ __(
					'Top toolbar activated',
					'fincommerce'
				) }
				messageDeactivated={ __(
					'Top toolbar deactivated',
					'fincommerce'
				) }
			/>
		</MenuGroup>
	);
}
