/**
 * External dependencies
 */
import clsx from 'clsx';
import { useBlockProps } from '@wordpress/block-editor';
import { useCheckoutAddress } from '@fincommerce/base-context/hooks';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';
import type { BlockAttributes } from '@wordpress/blocks';
/**
 * Internal dependencies
 */
import {
	FormStepBlock,
	AdditionalFields,
	AdditionalFieldsContent,
} from '@fincommerce/block-library/assets/js/blocks/checkout/form-step';
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-billing-address-block/block';
import {
	getBillingAddresssBlockTitle,
	getBillingAddresssBlockDescription,
} from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-billing-address-block/utils';
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
	setAttributes: ( attributes: BlockAttributes ) => void;
} ): JSX.Element | null => {
	const { showBillingFields, forcedBillingAddress, useBillingAsShipping } =
		useCheckoutAddress();

	if ( ! showBillingFields && ! useBillingAsShipping ) {
		return null;
	}
	attributes.title = getBillingAddresssBlockTitle(
		attributes.title,
		forcedBillingAddress
	);
	attributes.description = getBillingAddresssBlockDescription(
		attributes.description,
		forcedBillingAddress
	);

	return (
		<FormStepBlock
			setAttributes={ setAttributes }
			attributes={ attributes }
			className={ clsx(
				'wc-block-checkout__billing-fields',
				attributes?.className
			) }
		>
			<AddressFieldControls />
			<Block />
			<AdditionalFields block={ innerBlockAreas.BILLING_ADDRESS } />
		</FormStepBlock>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<AdditionalFieldsContent />
		</div>
	);
};
