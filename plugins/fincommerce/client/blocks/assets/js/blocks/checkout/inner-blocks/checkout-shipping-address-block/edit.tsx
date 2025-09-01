/**
 * External dependencies
 */
import clsx from 'clsx';
import { useBlockProps } from '@wordpress/block-editor';
import { useCheckoutAddress } from '@fincommerce/base-context/hooks';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import {
	FormStepBlock,
	AdditionalFields,
	AdditionalFieldsContent,
} from '@fincommerce/block-library/assets/js/blocks/checkout/form-step';
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-address-block/block';
import { AddressFieldControls } from '@fincommerce/block-library/assets/js/blocks/checkout/address-field-controls';

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
} ): JSX.Element | null => {
	const { showShippingFields } = useCheckoutAddress();

	if ( ! showShippingFields ) {
		return null;
	}

	return (
		<>
			<AddressFieldControls />
			<FormStepBlock
				setAttributes={ setAttributes }
				attributes={ attributes }
				className={ clsx(
					'wc-block-checkout__shipping-fields',
					attributes?.className
				) }
			>
				<Block />
				<AdditionalFields block={ innerBlockAreas.SHIPPING_ADDRESS } />
			</FormStepBlock>
		</>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<AdditionalFieldsContent />
		</div>
	);
};
