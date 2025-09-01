/**
 * External dependencies
 */
import clsx from 'clsx';
import { FormStep } from '@fincommerce/blocks-components';
import { ORDER_FORM_KEYS } from '@fincommerce/block-settings';
import { useSelect } from '@wordpress/data';
import { checkoutStore } from '@fincommerce/block-data';
import { withFilteredAttributes } from '@fincommerce/shared-hocs';
import { useCheckoutBlockContext } from '@fincommerce/blocks/checkout/context';
import { useCheckoutAddress } from '@fincommerce/base-context';
import { useFormFields } from '@fincommerce/base-components/cart-checkout';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-additional-information-block/block';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-additional-information-block/attributes';

const FrontendBlock = ( {
	title,
	description,
	children,
	className,
}: {
	title: string;
	description: string;
	children: JSX.Element;
	className?: string;
} ) => {
	const { showFormStepNumbers } = useCheckoutBlockContext();
	const { defaultFields } = useCheckoutAddress();
	const formFields = useFormFields( ORDER_FORM_KEYS, defaultFields, 'order' );
	const checkoutIsProcessing = useSelect(
		( select ) => select( checkoutStore ).isProcessing(),
		[]
	);

	if (
		formFields.length === 0 ||
		formFields.every( ( field ) => !! field.hidden )
	) {
		return null;
	}

	return (
		<FormStep
			id="order-fields"
			disabled={ checkoutIsProcessing }
			className={ clsx( 'wc-block-checkout__order-fields', className ) }
			title={ title }
			description={ description }
			showStepNumber={ showFormStepNumbers }
		>
			<Block />
			{ children }
		</FormStep>
	);
};

export default withFilteredAttributes( attributes )( FrontendBlock );
