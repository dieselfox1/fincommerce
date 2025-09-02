/**
 * External dependencies
 */
import { createElement, Fragment } from '@finpress/element';
import { recordEvent } from '@fincommerce/tracks';

/**
 * Internal dependencies
 */
import { WooProductMoreMenuItem } from '../woo-more-menu-item';
import { MoreMenuDropdown } from '../../more-menu-dropdown';

export const MoreMenu = () => {
	return (
		<>
			<MoreMenuDropdown
				toggleProps={ {
					onClick: () => recordEvent( 'product_dropdown_click' ),
				} }
				popoverProps={ {
					className: 'fincommerce-product-header__more-menu',
				} }
			>
				{ ( onClose ) => (
					<>
						<WooProductMoreMenuItem.Slot
							fillProps={ { onClose } }
						/>
					</>
				) }
			</MoreMenuDropdown>
		</>
	);
};
