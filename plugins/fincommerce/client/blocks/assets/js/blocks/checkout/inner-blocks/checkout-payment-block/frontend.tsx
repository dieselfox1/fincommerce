/**
 * External dependencies
 */
import clsx from 'clsx';
import { useStoreCart } from '@fincommerce/base-context/hooks';
import { withFilteredAttributes } from '@fincommerce/shared-hocs';
import {
	FormStep,
	StoreNoticesContainer,
} from '@fincommerce/blocks-components';
import { useSelect } from '@finpress/data';
import { checkoutStore } from '@fincommerce/block-data';
import { noticeContexts } from '@fincommerce/base-context';
import { useCheckoutBlockContext } from '@fincommerce/blocks/checkout/context';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-payment-block/block';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-payment-block/attributes';

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
	const { cartNeedsPayment } = useStoreCart();

	if ( ! cartNeedsPayment ) {
		return null;
	}
	return (
		<FormStep
			id="payment-method"
			disabled={ checkoutIsProcessing }
			className={ clsx( 'wc-block-checkout__payment-method', className ) }
			title={ title }
			description={ description }
			showStepNumber={ showFormStepNumbers }
		>
			<StoreNoticesContainer context={ noticeContexts.PAYMENTS } />
			<Block />
			{ children }
		</FormStep>
	);
};

export default withFilteredAttributes( attributes )( FrontendBlock );
