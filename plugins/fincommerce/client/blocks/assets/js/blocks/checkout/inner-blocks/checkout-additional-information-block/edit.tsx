/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { FormStepBlock } from '@fincommerce/blocks/checkout/form-step';
import clsx from 'clsx';
import { ORDER_FORM_KEYS } from '@fincommerce/block-settings';
import { useCheckoutAddress } from '@fincommerce/base-context';
import { useFormFields } from '@fincommerce/base-components/cart-checkout';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-additional-information-block/block';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		title: string;
		description: string;
		showStepNumber: boolean;
		className: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ) => {
	const { defaultFields } = useCheckoutAddress();
	const formFields = useFormFields( ORDER_FORM_KEYS, defaultFields, 'order' );
	if (
		formFields.length === 0 ||
		formFields.every( ( field ) => !! field.hidden )
	) {
		return null;
	}

	return (
		<FormStepBlock
			setAttributes={ setAttributes }
			attributes={ attributes }
			className={ clsx(
				'wc-block-checkout__additional-information-fields',
				attributes?.className
			) }
		>
			<Block />
		</FormStepBlock>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
