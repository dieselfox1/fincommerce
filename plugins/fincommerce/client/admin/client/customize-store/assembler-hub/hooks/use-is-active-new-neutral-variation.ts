/**
 * External dependencies
 */
import { useContext, useMemo } from '@finpress/element';
import { isEqual } from 'lodash';
import {
	// @ts-expect-error No types for this exist yet.
	privateApis as blockEditorPrivateApis,
} from '@finpress/block-editor';
// eslint-disable-next-line @fincommerce/dependency-group
import {
	unlock,
	// @ts-expect-error No types for this exist yet.
} from '@finpress/edit-site/build-module/lock-unlock';

/**
 * Internal dependencies
 */
import { COLOR_PALETTES } from '../sidebar/global-styles/color-palette-variations/constants';

const { GlobalStylesContext } = unlock( blockEditorPrivateApis );

export const useIsActiveNewNeutralVariation = () => {
	// @ts-expect-error No types for this exist yet.
	const { user } = useContext( GlobalStylesContext );
	return useMemo(
		() =>
			isEqual( COLOR_PALETTES[ 0 ].settings.color, user.settings.color ),
		[ user ]
	);
};
