/**
 * External dependencies
 */
import { useProductDataContext } from '@fincommerce/shared-context';
import { Disabled, Spinner } from '@finpress/components';
import { useBlockProps } from '@finpress/block-editor';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import QuantityStepper from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/components/quantity-stepper';

const CTA = () => {
	const { isLoading, product } = useProductDataContext();

	if ( isLoading ) {
		return <Spinner />;
	}

	const {
		permalink,
		add_to_cart: productCartDetails,
		has_options: hasOptions,
		is_purchasable: isPurchasable,
		is_in_stock: isInStock,
		sold_individually: soldIndividually,
	} = product;

	if ( ! hasOptions && isPurchasable && isInStock ) {
		if ( soldIndividually ) {
			return (
				<input
					type="checkbox"
					value="1"
					className="wc-grouped-product-add-to-cart-checkbox"
				/>
			);
		}
		return <QuantityStepper />;
	}

	return (
		<a
			aria-label={ productCartDetails?.description || '' }
			className="button wp-element-button add_to_cart_button wc-block-components-product-button__button"
			href={ permalink }
		>
			{ productCartDetails?.text || __( 'Add to Cart', 'fincommerce' ) }
		</a>
	);
};

export default function ProductItemCTAEdit() {
	const blockProps = useBlockProps( {
		className:
			'wc-block-add-to-cart-with-options-grouped-product-item-selector',
	} );

	return (
		<div { ...blockProps }>
			<Disabled>
				<CTA />
			</Disabled>
		</div>
	);
}
