/**
 * External dependencies
 */
import { useStoreCart } from '@fincommerce/base-context/hooks';
import { useEffect } from '@finpress/element';
import { dispatchEvent } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/empty-cart-block/style.scss';

const FrontendBlock = ( {
	children,
	className,
}: {
	children: JSX.Element;
	className: string;
} ): JSX.Element | null => {
	const { cartItems, cartIsLoading } = useStoreCart();
	useEffect( () => {
		if ( cartItems.length !== 0 || cartIsLoading ) {
			return;
		}
		dispatchEvent( 'wc-blocks_render_blocks_frontend', {
			element: document.body.querySelector(
				'.wp-block-fincommerce-cart'
			),
		} );
	}, [ cartIsLoading, cartItems ] );
	if ( ! cartIsLoading && cartItems.length === 0 ) {
		return <div className={ className }>{ children }</div>;
	}
	return null;
};

export default FrontendBlock;
