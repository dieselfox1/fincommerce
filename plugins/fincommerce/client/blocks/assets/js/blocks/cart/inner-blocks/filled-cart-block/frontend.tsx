/**
 * External dependencies
 */
import clsx from 'clsx';
import { SidebarLayout } from '@fincommerce/base-components/sidebar-layout';
import { useStoreCart } from '@fincommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import { useCartBlockContext } from '@fincommerce/block-library/assets/js/blocks/cart/context';

const FrontendBlock = ( {
	children,
	className,
}: {
	children: JSX.Element | JSX.Element[];
	className: string;
} ): JSX.Element | null => {
	const { cartItems, cartIsLoading } = useStoreCart();
	const { hasDarkControls } = useCartBlockContext();

	if ( cartIsLoading || cartItems.length >= 1 ) {
		return (
			<SidebarLayout
				className={ clsx( 'wc-block-cart', className, {
					'has-dark-controls': hasDarkControls,
				} ) }
			>
				{ children }
			</SidebarLayout>
		);
	}
	return null;
};

export default FrontendBlock;
