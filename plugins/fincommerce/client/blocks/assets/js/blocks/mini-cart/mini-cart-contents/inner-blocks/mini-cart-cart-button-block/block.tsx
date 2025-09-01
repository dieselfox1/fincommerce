/**
 * External dependencies
 */
import { CART_URL } from '@fincommerce/block-settings';
import Button from '@fincommerce/base-components/button';
import clsx from 'clsx';
import { useStyleProps } from '@fincommerce/base-hooks';

/**
 * Internal dependencies
 */
import { defaultCartButtonLabel } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-cart-button-block/constants';
import { getVariant } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/utils';

type MiniCartCartButtonBlockProps = {
	cartButtonLabel?: string;
	className?: string;
	style?: string;
};

const Block = ( {
	className,
	cartButtonLabel,
	style,
}: MiniCartCartButtonBlockProps ): JSX.Element | null => {
	const styleProps = useStyleProps( { style } );

	if ( ! CART_URL ) {
		return null;
	}

	return (
		<Button
			className={ clsx(
				className,
				styleProps.className,
				'wc-block-mini-cart__footer-cart'
			) }
			style={ styleProps.style }
			href={ CART_URL }
			variant={ getVariant( className, 'outlined' ) }
		>
			{ cartButtonLabel || defaultCartButtonLabel }
		</Button>
	);
};

export default Block;
