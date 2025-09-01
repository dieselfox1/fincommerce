/**
 * External dependencies
 */
import clsx from 'clsx';
import { withFilteredAttributes } from '@fincommerce/shared-hocs';
import { FormStep } from '@fincommerce/blocks-components';
import { useSelect } from '@wordpress/data';
import { checkoutStore } from '@fincommerce/block-data';
import { useCheckoutBlockContext } from '@fincommerce/blocks/checkout/context';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-contact-information-block/block';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-contact-information-block/attributes';
import LoginPrompt from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-contact-information-block/login-prompt';

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
	const checkoutIsProcessing = useSelect( ( select ) =>
		select( checkoutStore ).isProcessing()
	);

	const { showFormStepNumbers } = useCheckoutBlockContext();

	return (
		<FormStep
			id="contact-fields"
			disabled={ checkoutIsProcessing }
			className={ clsx( 'wc-block-checkout__contact-fields', className ) }
			title={ title }
			description={ description }
			showStepNumber={ showFormStepNumbers }
			stepHeadingContent={ () => <LoginPrompt /> }
		>
			<Block />
			{ children }
		</FormStep>
	);
};

export default withFilteredAttributes( attributes )( FrontendBlock );
