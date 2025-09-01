/**
 * External dependencies
 */
import { useStoreCart } from '@fincommerce/base-context/hooks';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import TitleItemsCounter from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-title-items-counter-block/block';
import TitleYourCart from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-title-label-block/block';
import { hasChildren } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/utils';

type MiniCartTitleBlockProps = {
	className: string;
	children: JSX.Element;
};

const Block = ( {
	children,
	className,
}: MiniCartTitleBlockProps ): JSX.Element | null => {
	const { cartIsLoading } = useStoreCart();
	if ( cartIsLoading ) {
		return null;
	}

	// The `Mini-Cart Title` was converted to two inner blocks, but we still need to render the old title for
	// themes that have the old `mini-cart.html` template. So we check if there are any inner blocks and if
	// not, render the title blocks.
	const hasTitleInnerBlocks = hasChildren( children );

	return (
		<h2 className={ clsx( className, 'wc-block-mini-cart__title' ) }>
			{ hasTitleInnerBlocks ? (
				children
			) : (
				<>
					<TitleYourCart />
					<TitleItemsCounter />
				</>
			) }
		</h2>
	);
};

export default Block;
