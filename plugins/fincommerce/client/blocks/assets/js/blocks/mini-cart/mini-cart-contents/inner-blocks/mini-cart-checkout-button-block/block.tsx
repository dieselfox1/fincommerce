/**
 * External dependencies
 */
import { CHECKOUT_URL } from '@fincommerce/block-settings';
import Button from '@fincommerce/base-components/button';
import clsx from 'clsx';
import { useStyleProps } from '@fincommerce/base-hooks';
import { useCartEventsContext } from '@fincommerce/base-context';
import { isErrorResponse } from '@fincommerce/types';

/**
 * Internal dependencies
 */
import { defaultCheckoutButtonLabel } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-checkout-button-block/constants';
import { getVariant } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/utils';

type MiniCartCheckoutButtonBlockProps = {
	checkoutButtonLabel?: string;
	className?: string;
	style?: string;
};

const Block = ( {
	className,
	checkoutButtonLabel,
	style,
}: MiniCartCheckoutButtonBlockProps ): JSX.Element | null => {
	const styleProps = useStyleProps( { style } );
	const { dispatchOnProceedToCheckout } = useCartEventsContext();

	if ( ! CHECKOUT_URL ) {
		return null;
	}

	return (
		<Button
			className={ clsx(
				className,
				styleProps.className,
				'wc-block-mini-cart__footer-checkout'
			) }
			variant={ getVariant( className, 'contained' ) }
			style={ styleProps.style }
			href={ CHECKOUT_URL }
			onClick={ ( e ) => {
				dispatchOnProceedToCheckout().then( ( observerResponses ) => {
					if ( observerResponses.some( isErrorResponse ) ) {
						e.preventDefault();
					}
				} );
			} }
		>
			{ checkoutButtonLabel || defaultCheckoutButtonLabel }
		</Button>
	);
};

export default Block;
