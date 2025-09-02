/**
 * External dependencies
 */
import { CART_URL } from '@fincommerce/block-settings';
import { Icon, arrowLeft } from '@finpress/icons';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/base/components/cart-checkout/return-to-cart-button/style.scss';

interface ReturnToCartButtonProps {
	href?: string | undefined;
	children: React.ReactNode;
	element?: React.ElementType;
}

const ReturnToCartButton = ( {
	href,
	children,
	element = 'a',
}: ReturnToCartButtonProps ): JSX.Element | null => {
	const cartLink = href || CART_URL;
	if ( ! cartLink ) {
		return null;
	}
	const Element = element;
	return (
		<Element
			{ ...( element === 'a' ? { href: cartLink } : {} ) }
			className="wc-block-components-checkout-return-to-cart-button"
		>
			<Icon icon={ arrowLeft } />
			{ children }
		</Element>
	);
};

export default ReturnToCartButton;
