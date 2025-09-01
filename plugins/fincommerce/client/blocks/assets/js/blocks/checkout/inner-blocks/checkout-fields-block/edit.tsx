/**
 * External dependencies
 */
import clsx from 'clsx';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Main } from '@fincommerce/base-components/sidebar-layout';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';
import type { TemplateArray } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { useCheckoutBlockContext } from '@fincommerce/block-library/assets/js/blocks/checkout/context';
import {
	useForcedLayout,
	getAllowedBlocks,
} from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-fields-block/style.scss';
import { AddressFieldControls } from '@fincommerce/block-library/assets/js/blocks/checkout/address-field-controls';
export const Edit = ( {
	clientId,
	attributes,
}: {
	clientId: string;
	attributes: {
		className?: string;
		isPreview?: boolean;
	};
} ): JSX.Element => {
	const blockProps = useBlockProps( {
		className: clsx( 'wc-block-checkout__main', attributes?.className ),
	} );
	const allowedBlocks = getAllowedBlocks( innerBlockAreas.CHECKOUT_FIELDS );

	const { showFormStepNumbers } = useCheckoutBlockContext();

	const defaultTemplate = [
		[ 'fincommerce/checkout-express-payment-block', {}, [] ],
		[ 'fincommerce/checkout-contact-information-block', {}, [] ],
		[ 'fincommerce/checkout-shipping-method-block', {}, [] ],
		[ 'fincommerce/checkout-pickup-options-block', {}, [] ],
		[ 'fincommerce/checkout-shipping-address-block', {}, [] ],
		[ 'fincommerce/checkout-billing-address-block', {}, [] ],
		[ 'fincommerce/checkout-shipping-methods-block', {}, [] ],
		[ 'fincommerce/checkout-payment-block', {}, [] ],
		[ 'fincommerce/checkout-additional-information-block', {}, [] ],
		[ 'fincommerce/checkout-order-note-block', {}, [] ],
		[ 'fincommerce/checkout-terms-block', {}, [] ],
		[ 'fincommerce/checkout-actions-block', {}, [] ],
	].filter( Boolean ) as unknown as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );

	return (
		<Main { ...blockProps }>
			<AddressFieldControls />
			<form
				className={ clsx(
					'wc-block-components-form wc-block-checkout__form',
					{
						'wc-block-checkout__form--with-step-numbers':
							showFormStepNumbers,
					}
				) }
			>
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					templateLock={ false }
					template={ defaultTemplate }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</form>
		</Main>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};
