/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { ToolbarButton } from '@finpress/components';
import { _x, isRTL } from '@finpress/i18n';
import { formatLtr } from '@finpress/icons';

/**
 * Internal dependencies
 */
import type { RTLToolbarButtonProps } from './types';

export function RTLToolbarButton( {
	direction,
	onChange,
}: RTLToolbarButtonProps ) {
	if ( ! isRTL() ) {
		return null;
	}

	return (
		<ToolbarButton
			icon={ formatLtr }
			title={ _x( 'Left to right', 'editor button', 'fincommerce' ) }
			isActive={ direction === 'ltr' }
			onClick={ () =>
				onChange?.( direction === 'ltr' ? undefined : 'ltr' )
			}
		/>
	);
}
