/**
 * External dependencies
 */
import clsx from 'clsx';
import { withFilteredAttributes } from '@fincommerce/shared-hocs';
import { FormStep } from '@fincommerce/blocks-components';
import { useCheckoutAddress } from '@fincommerce/base-context/hooks';
import { useSelect } from '@finpress/data';
import { checkoutStore } from '@fincommerce/block-data';
/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-address-block/block';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-address-block/attributes';
import { useCheckoutBlockContext } from '@fincommerce/block-library/assets/js/blocks/checkout/context';

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
	const checkoutIsProcessing = useSelect( ( select ) =>
		select( checkoutStore ).isProcessing()
	);
	const { showShippingFields } = useCheckoutAddress();
	const { showFormStepNumbers } = useCheckoutBlockContext();

	if ( ! showShippingFields ) {
		return null;
	}

	return (
		<FormStep
			id="shipping-fields"
			disabled={ checkoutIsProcessing }
			className={ clsx(
				'wc-block-checkout__shipping-fields',
				className
			) }
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
