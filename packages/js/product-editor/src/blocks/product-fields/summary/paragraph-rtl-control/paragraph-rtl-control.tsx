/**
 * External dependencies
 */
import { createElement, Fragment } from '@finpress/element';
import { ToolbarButton } from '@finpress/components';
import { _x, isRTL } from '@finpress/i18n';
import { formatLtr } from '@finpress/icons';

/**
 * Internal dependencies
 */
import { ParagraphRTLControlProps } from './types';

export function ParagraphRTLControl( {
	direction,
	onChange,
}: ParagraphRTLControlProps ) {
	function handleClick() {
		if ( typeof onChange === 'function' ) {
			onChange( direction === 'ltr' ? undefined : 'ltr' );
		}
	}

	return (
		<>
			{ isRTL() && (
				<ToolbarButton
					icon={ formatLtr }
					title={ _x(
						'Left to right',
						'editor button',
						'fincommerce'
					) }
					isActive={ direction === 'ltr' }
					onClick={ handleClick }
				/>
			) }
		</>
	);
}
