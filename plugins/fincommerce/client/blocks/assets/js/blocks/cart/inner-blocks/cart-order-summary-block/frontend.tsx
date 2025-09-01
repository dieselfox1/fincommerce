/**
 * External dependencies
 */
import { TotalsFooterItem } from '@fincommerce/base-components/cart-checkout';
import { getCurrencyFromPriceResponse } from '@fincommerce/price-format';
import { useStoreCart } from '@fincommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import { OrderMetaSlotFill } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-block/slotfills';

const FrontendBlock = ( {
	children,
	className = '',
}: {
	children?: JSX.Element | JSX.Element[];
	className?: string;
} ) => {
	const { cartTotals } = useStoreCart();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<div className={ className }>
			{ children }
			<div className="wc-block-components-totals-wrapper">
				<TotalsFooterItem
					currency={ totalsCurrency }
					values={ cartTotals }
					isEstimate={ true }
				/>
			</div>
			<OrderMetaSlotFill />
		</div>
	);
};

export default FrontendBlock;
