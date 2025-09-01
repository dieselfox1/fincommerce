/**
 * External dependencies
 */
import { TotalsTaxes, TotalsWrapper } from '@fincommerce/blocks-components';
import { getCurrencyFromPriceResponse } from '@fincommerce/price-format';
import {
	useStoreCart,
	useOrderSummaryLoadingState,
} from '@fincommerce/base-context';
import { getSetting } from '@fincommerce/settings';

const Block = ( {
	className,
	showRateAfterTaxName,
}: {
	className: string;
	showRateAfterTaxName: boolean;
} ) => {
	const { cartTotals } = useStoreCart();
	const { isLoading } = useOrderSummaryLoadingState();

	const displayCartPricesIncludingTax = getSetting(
		'displayCartPricesIncludingTax',
		false
	);

	if (
		displayCartPricesIncludingTax ||
		parseInt( cartTotals.total_tax, 10 ) <= 0
	) {
		return null;
	}

	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<TotalsWrapper className={ className }>
			<TotalsTaxes
				showRateAfterTaxName={ showRateAfterTaxName }
				currency={ totalsCurrency }
				values={ cartTotals }
				showSkeleton={ isLoading }
			/>
		</TotalsWrapper>
	);
};

export default Block;
