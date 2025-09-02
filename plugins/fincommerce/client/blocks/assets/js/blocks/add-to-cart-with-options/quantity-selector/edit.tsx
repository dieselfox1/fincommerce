/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';
import { Disabled } from '@finpress/components';

/**
 * Internal dependencies
 */
import QuantityStepper from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/components/quantity-stepper';

const AddToCartWithOptionsQuantitySelectorEdit = () => {
	const blockProps = useBlockProps( {
		className: 'wc-block-add-to-cart-with-options__quantity-selector',
	} );

	return (
		<div { ...blockProps }>
			<Disabled>
				<QuantityStepper />
			</Disabled>
		</div>
	);
};

export default AddToCartWithOptionsQuantitySelectorEdit;
