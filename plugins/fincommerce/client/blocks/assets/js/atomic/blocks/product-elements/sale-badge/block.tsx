/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import clsx from 'clsx';
import { Label } from '@fincommerce/blocks-components';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@fincommerce/shared-context';
import { useStyleProps } from '@fincommerce/base-hooks';
import { withProductDataContext } from '@fincommerce/shared-hocs';
import type { HTMLAttributes } from 'react';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sale-badge/style.scss';
import type { BlockAttributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sale-badge/types';

type Props = BlockAttributes &
	HTMLAttributes< HTMLDivElement > & {
		align: boolean;
		isDescendentOfSingleProductTemplate: boolean;
	};

export const Block = ( props: Props ): JSX.Element | null => {
	const { className, align, isDescendentOfSingleProductTemplate } = props;
	const styleProps = useStyleProps( props );
	const { parentClassName } = useInnerBlockLayoutContext();
	const { product } = useProductDataContext();

	/**
	 * Only show sale badge for products that are on sale.
	 * Always show in templates for preview purposes.
	 */
	if (
		( ! product.id || ! product.on_sale ) &&
		! isDescendentOfSingleProductTemplate
	) {
		return null;
	}

	const alignClass =
		typeof align === 'string'
			? `wc-block-components-product-sale-badge--align-${ align }`
			: '';

	return (
		<div
			className={ clsx(
				'wc-block-components-product-sale-badge',
				className,
				alignClass,
				{
					[ `${ parentClassName }__product-onsale` ]: parentClassName,
				},
				styleProps.className
			) }
			style={ styleProps.style }
		>
			<Label
				label={ __( 'Sale', 'fincommerce' ) }
				screenReaderLabel={ __( 'Product on sale', 'fincommerce' ) }
			/>
		</div>
	);
};

export default withProductDataContext( Block );
