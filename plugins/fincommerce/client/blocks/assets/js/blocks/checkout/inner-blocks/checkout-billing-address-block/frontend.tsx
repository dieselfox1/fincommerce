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
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-billing-address-block/block';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-billing-address-block/attributes';
import { useCheckoutBlockContext } from '@fincommerce/block-library/assets/js/blocks/checkout/context';
import {
	getBillingAddresssBlockTitle,
	getBillingAddresssBlockDescription,
} from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-billing-address-block/utils';

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
} ): JSX.Element | null => {
	const { showFormStepNumbers } = useCheckoutBlockContext();
	const checkoutIsProcessing = useSelect( ( select ) =>
		select( checkoutStore ).isProcessing()
	);
	const { showBillingFields, forcedBillingAddress, useBillingAsShipping } =
		useCheckoutAddress();

	if ( ! showBillingFields && ! useBillingAsShipping ) {
		return null;
	}

	title = getBillingAddresssBlockTitle( title, forcedBillingAddress );
	description = getBillingAddresssBlockDescription(
		description,
		forcedBillingAddress
	);
	return (
		<FormStep
			id="billing-fields"
			disabled={ checkoutIsProcessing }
			className={ clsx( 'wc-block-checkout__billing-fields', className ) }
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
