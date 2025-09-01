/**
 * External dependencies
 */
import clsx from 'clsx';
import { useInnerBlockLayoutContext } from '@fincommerce/shared-context';
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { renderProductLayout } from '@fincommerce/block-library/assets/js/base/components/product-list/product-list-item/utils';
import { ProductListItemProps } from '@fincommerce/block-library/assets/js/base/components/product-list/types';

const ProductListItem = ( {
	product = {},
	attributes,
	instanceId,
}: ProductListItemProps ): JSX.Element => {
	const { layoutConfig } = attributes;
	const { parentClassName, parentName } = useInnerBlockLayoutContext();
	const isLoading = Object.keys( product ).length === 0;
	const classes = clsx( `${ parentClassName }__product`, 'wc-block-layout', {
		'is-loading': isLoading,
	} );

	return (
		<li className={ classes } aria-hidden={ isLoading }>
			{ renderProductLayout(
				parentName,
				product,
				layoutConfig,
				instanceId
			) }
		</li>
	);
};

export default withInstanceId( ProductListItem );
