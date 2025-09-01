/**
 * External dependencies
 */
import { WC_FOOTER_SLOT_NAME, WooFooterItem } from '@fincommerce/admin-layout';
import { useSlot } from '@fincommerce/experimental';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import './footer.scss';
import useIsScrolled from '~/hooks/useIsScrolled';

export const Footer = () => {
	const slot = useSlot( WC_FOOTER_SLOT_NAME );
	const hasFills = Boolean( slot?.fills?.length );
	const { atBottom } = useIsScrolled();

	if ( ! hasFills ) {
		return null;
	}
	return (
		<div
			className={ clsx( 'fincommerce-layout__footer', {
				'at-bottom': atBottom,
			} ) }
		>
			<WooFooterItem.Slot />
		</div>
	);
};
