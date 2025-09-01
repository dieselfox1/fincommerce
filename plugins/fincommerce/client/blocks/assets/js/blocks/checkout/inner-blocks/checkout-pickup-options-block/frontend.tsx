/**
 * External dependencies
 */
import clsx from 'clsx';
import { withFilteredAttributes } from '@fincommerce/shared-hocs';
import { FormStep } from '@fincommerce/blocks-components';
import { useSelect } from '@wordpress/data';
import { checkoutStore as checkoutStoreDescriptor } from '@fincommerce/block-data';
import { LOCAL_PICKUP_ENABLED } from '@fincommerce/block-settings';
import { useCheckoutBlockContext } from '@fincommerce/blocks/checkout/context';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-pickup-options-block/block';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-pickup-options-block/attributes';

const FrontendBlock = ( {
	title,
	description,
	children,
	className,
}: {
	title: string;
	description: string;
	showStepNumber: boolean;
	children: JSX.Element;
	className?: string;
} ) => {
	const { checkoutIsProcessing, prefersCollection } = useSelect(
		( select ) => {
			const checkoutStore = select( checkoutStoreDescriptor );
			return {
				checkoutIsProcessing: checkoutStore.isProcessing(),
				prefersCollection: checkoutStore.prefersCollection(),
			};
		}
	);

	const { showFormStepNumbers } = useCheckoutBlockContext();

	if ( ! prefersCollection || ! LOCAL_PICKUP_ENABLED ) {
		return null;
	}

	return (
		<FormStep
			id="pickup-options"
			disabled={ checkoutIsProcessing }
			className={ clsx( 'wc-block-checkout__pickup-options', className ) }
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
