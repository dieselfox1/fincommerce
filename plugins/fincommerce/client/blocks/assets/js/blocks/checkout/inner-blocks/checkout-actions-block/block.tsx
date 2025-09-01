/**
 * External dependencies
 */
import clsx from 'clsx';
import { getSetting } from '@fincommerce/settings';
import {
	PlaceOrderButton,
	ReturnToCartButton,
} from '@fincommerce/base-components/cart-checkout';
import { useCheckoutSubmit } from '@fincommerce/base-context/hooks';
import { noticeContexts } from '@fincommerce/base-context';
import { StoreNoticesContainer } from '@fincommerce/blocks-components';
import { applyCheckoutFilter } from '@fincommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import { defaultPlaceOrderButtonLabel } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/constants';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/style.scss';
import { CheckoutOrderSummarySlot } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-block/slotfills';

export type BlockAttributes = {
	cartPageId: number;
	showReturnToCart: boolean;
	className?: string;
	placeOrderButtonLabel: string;
	priceSeparator: string;
	returnToCartButtonLabel: string;
};

const Block = ( {
	cartPageId,
	showReturnToCart,
	className,
	placeOrderButtonLabel,
	returnToCartButtonLabel,
	priceSeparator,
}: {
	cartPageId: number;
	showReturnToCart: boolean;
	className?: string;
	placeOrderButtonLabel: string;
} ): JSX.Element => {
	const { paymentMethodButtonLabel } = useCheckoutSubmit();

	const label = applyCheckoutFilter( {
		filterName: 'placeOrderButtonLabel',
		defaultValue:
			paymentMethodButtonLabel ||
			placeOrderButtonLabel ||
			defaultPlaceOrderButtonLabel,
	} );

	const showPrice = className?.includes( 'is-style-with-price' ) || false;

	return (
		<div className={ clsx( 'wc-block-checkout__actions', className ) }>
			<CheckoutOrderSummarySlot />
			<StoreNoticesContainer
				context={ noticeContexts.CHECKOUT_ACTIONS }
			/>
			<div className="wc-block-checkout__actions_row">
				{ showReturnToCart && (
					<ReturnToCartButton
						href={ getSetting( 'page-' + cartPageId, false ) }
					>
						{ returnToCartButtonLabel }
					</ReturnToCartButton>
				) }
				{ showPrice && (
					<style>
						{ `.wp-block-fincommerce-checkout-actions-block {
						.wc-block-components-checkout-place-order-button__separator {
							&::after {
								content: "${ priceSeparator }";
							}
						}
					}` }
					</style>
				) }
				<PlaceOrderButton
					label={ label }
					fullWidth={ ! showReturnToCart }
					showPrice={ showPrice }
					priceSeparator={ priceSeparator }
				/>
			</div>
		</div>
	);
};

export default Block;
