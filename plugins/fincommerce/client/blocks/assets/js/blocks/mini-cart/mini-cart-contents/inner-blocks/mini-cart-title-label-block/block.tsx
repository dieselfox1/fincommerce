/**
 * External dependencies
 */
import { useStyleProps } from '@fincommerce/base-hooks';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { defaultYourCartLabel } from '@fincommerce/block-library/assets/js/blocks/mini-cart/mini-cart-contents/inner-blocks/mini-cart-title-label-block/constants';

type Props = {
	label?: string;
	className?: string;
};

const Block = ( props: Props ): JSX.Element => {
	const styleProps = useStyleProps( props );

	return (
		<span
			className={ clsx( props.className, styleProps.className ) }
			style={ styleProps.style }
		>
			{ props.label || defaultYourCartLabel }
		</span>
	);
};

export default Block;
