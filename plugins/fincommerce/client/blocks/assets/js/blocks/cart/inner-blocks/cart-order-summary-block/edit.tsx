/**
 * External dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import type { TemplateArray } from '@wordpress/blocks';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';
import { __ } from '@wordpress/i18n';
import { TotalsFooterItem } from '@fincommerce/base-components/cart-checkout';
import { getCurrencyFromPriceResponse } from '@fincommerce/price-format';
import { useStoreCart } from '@fincommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import {
	useForcedLayout,
	getAllowedBlocks,
} from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared';
import { OrderMetaSlotFill } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-block/slotfills';

export const Edit = ( { clientId }: { clientId: string } ): JSX.Element => {
	const blockProps = useBlockProps();
	const { cartTotals } = useStoreCart();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );
	const allowedBlocks = getAllowedBlocks(
		innerBlockAreas.CART_ORDER_SUMMARY
	);
	const defaultTemplate = [
		[
			'fincommerce/cart-order-summary-heading-block',
			{
				content: __( 'Cart totals', 'fincommerce' ),
			},
			[],
		],
		[ 'fincommerce/cart-order-summary-coupon-form-block', {}, [] ],
		[ 'fincommerce/cart-order-summary-totals-block', {}, [] ],
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
			<div className="wc-block-components-totals-wrapper">
				<TotalsFooterItem
					currency={ totalsCurrency }
					values={ cartTotals }
					isEstimate={ true }
				/>
			</div>
			{ /* do I put an totals wrapper here? */ }
			<OrderMetaSlotFill />
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
