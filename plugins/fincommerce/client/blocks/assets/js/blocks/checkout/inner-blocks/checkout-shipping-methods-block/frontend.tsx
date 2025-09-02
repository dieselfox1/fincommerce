/**
 * External dependencies
 */
import clsx from 'clsx';
import { withFilteredAttributes } from '@fincommerce/shared-hocs';
import { FormStep } from '@fincommerce/blocks-components';
import { useCheckoutAddress } from '@fincommerce/base-context/hooks';
import { useSelect } from '@finpress/data';
import { checkoutStore } from '@fincommerce/block-data';
import { useCheckoutBlockContext } from '@fincommerce/blocks/checkout/context';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-methods-block/block';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-methods-block/attributes';

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
	const checkoutIsProcessing = useSelect( ( select ) =>
		select( checkoutStore ).isProcessing()
	);
	const { showShippingMethods } = useCheckoutAddress();

	if ( ! showShippingMethods ) {
		return null;
	}

	return (
		<FormStep
			id="shipping-option"
			disabled={ checkoutIsProcessing }
			className={ clsx(
				'wc-block-checkout__shipping-option',
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
