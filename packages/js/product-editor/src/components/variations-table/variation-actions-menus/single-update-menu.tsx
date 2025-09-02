/**
 * External dependencies
 */
import { DropdownMenu } from '@finpress/components';
import { createElement } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { moreVertical } from '@finpress/icons';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import { VariationActionsMenuProps } from './types';
import { TRACKS_SOURCE } from '../../../constants';
import { VariationActions } from './variation-actions';

export function SingleUpdateMenu( {
	selection,
	onChange,
	onDelete,
}: VariationActionsMenuProps ) {
	if ( ! selection || selection.length !== 1 ) {
		return null;
	}

	return (
		<DropdownMenu
			popoverProps={ {
				placement: 'left-start',
			} }
			icon={ moreVertical }
			label={ __( 'Actions', 'fincommerce' ) }
			toggleProps={ {
				onClick() {
					recordEvent( 'product_variations_menu_view', {
						source: TRACKS_SOURCE,
						variation_id: selection[ 0 ].id,
					} );
				},
			} }
		>
			{ ( { onClose }: { onClose: () => void } ) => (
				<VariationActions
					selection={ selection }
					onClose={ onClose }
					onChange={ onChange }
					onDelete={ onDelete }
					supportsMultipleSelection={ false }
				/>
			) }
		</DropdownMenu>
	);
}
