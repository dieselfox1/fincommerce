/**
 * External dependencies
 */
import { Subtotal, TotalsWrapper } from '@fincommerce/blocks-components';
import { getCurrencyFromPriceResponse } from '@fincommerce/price-format';
import {
	useStoreCart,
	useOrderSummaryLoadingState,
} from '@fincommerce/base-context/hooks';

const Block = ( { className = '' }: { className?: string } ): JSX.Element => {
	const { cartTotals } = useStoreCart();
	const { isLoading } = useOrderSummaryLoadingState();
	const totalsCurrency = getCurrencyFromPriceResponse( cartTotals );

	return (
		<TotalsWrapper className={ className }>
			<Subtotal
				currency={ totalsCurrency }
				values={ cartTotals }
				showSkeleton={ isLoading }
			/>
		</TotalsWrapper>
	);
};

export default Block;
