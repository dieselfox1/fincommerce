/**
 * External dependencies
 */
import { useStoreCart } from '@fincommerce/base-context';
import clsx from 'clsx';
import { _n, sprintf } from '@finpress/i18n';
import { useStyleProps } from '@fincommerce/base-hooks';

type Props = {
	className?: string;
};

const Block = ( props: Props ): JSX.Element => {
	const { cartItemsCount } = useStoreCart();
	const styleProps = useStyleProps( props );

	return (
		<span
			className={ clsx( props.className, styleProps.className ) }
			style={ styleProps.style }
		>
			{ sprintf(
				/* translators: %d is the count of items in the cart. */
				_n( '(%d item)', '(%d items)', cartItemsCount, 'fincommerce' ),
				cartItemsCount
			) }
		</span>
	);
};

export default Block;
