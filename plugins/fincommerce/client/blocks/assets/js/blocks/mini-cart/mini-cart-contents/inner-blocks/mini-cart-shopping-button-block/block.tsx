/**
 * External dependencies
 */
import { SHOP_URL } from '@fincommerce/block-settings';
import Button from '@fincommerce/base-components/button';
import { useStyleProps } from '@fincommerce/base-hooks';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { defaultStartShoppingButtonLabel } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-shopping-button-block/constants';
import { getVariant } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/utils';

type MiniCartShoppingButtonBlockProps = {
	className: string;
	startShoppingButtonLabel: string;
	style?: string;
	textColor?: string;
	backgroundColor?: string;
};

const Block = ( {
	className,
	startShoppingButtonLabel,
	style,
	textColor,
	backgroundColor,
}: MiniCartShoppingButtonBlockProps ): JSX.Element | null => {
	const styleProps = useStyleProps( {
		style,
		textColor,
		backgroundColor,
	} );

	if ( ! SHOP_URL ) {
		return null;
	}

	return (
		<div className="wp-block-button has-text-align-center">
			<Button
				className={ clsx(
					className,
					styleProps.className,
					'wc-block-mini-cart__shopping-button'
				) }
				style={ styleProps.style }
				variant={ getVariant( className, 'contained' ) }
				href={ SHOP_URL }
			>
				{ startShoppingButtonLabel || defaultStartShoppingButtonLabel }
			</Button>
		</div>
	);
};

export default Block;
