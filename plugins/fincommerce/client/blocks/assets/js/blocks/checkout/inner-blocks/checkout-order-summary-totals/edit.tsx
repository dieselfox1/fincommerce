/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@finpress/block-editor';
import type { TemplateArray } from '@finpress/blocks';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import {
	useForcedLayout,
	getAllowedBlocks,
} from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
	const allowedBlocks = getAllowedBlocks(
		innerBlockAreas.CHECKOUT_ORDER_SUMMARY_TOTALS
	);
	const defaultTemplate = [
		[ 'fincommerce/checkout-order-summary-subtotal-block', {}, [] ],
		[ 'fincommerce/checkout-order-summary-fee-block', {}, [] ],
		[ 'fincommerce/checkout-order-summary-discount-block', {}, [] ],
		[ 'fincommerce/checkout-order-summary-shipping-block', {}, [] ],
		[ 'fincommerce/checkout-order-summary-taxes-block', {}, [] ],
	] as TemplateArray;

	useForcedLayout( {
		clientId,
		registeredBlocks: allowedBlocks,
		defaultTemplate,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={ defaultTemplate }
			/>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};
