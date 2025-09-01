/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useInnerBlockLayoutContext } from '@fincommerce/shared-context';
import { Icon, search } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { NoMatchingProductsProps } from '@fincommerce/block-library/assets/js/base/components/product-list/types';

const NoMatchingProducts = ( {
	resetCallback = () => void 0,
}: NoMatchingProductsProps ): JSX.Element => {
	const { parentClassName } = useInnerBlockLayoutContext();
	return (
		<div className={ `${ parentClassName }__no-products` }>
			<Icon
				className={ `${ parentClassName }__no-products-image` }
				icon={ search }
				size={ 100 }
			/>
			<strong className={ `${ parentClassName }__no-products-title` }>
				{ __( 'No products found', 'fincommerce' ) }
			</strong>
			<p className={ `${ parentClassName }__no-products-description` }>
				{ __(
					'We were unable to find any results based on your search.',
					'fincommerce'
				) }
			</p>
			<button onClick={ resetCallback }>
				{ __( 'Reset Search', 'fincommerce' ) }
			</button>
		</div>
	);
};

export default NoMatchingProducts;
