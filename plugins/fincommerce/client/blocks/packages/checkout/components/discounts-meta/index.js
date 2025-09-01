/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { createSlotFill, hasValidFills, useSlotFills } from '@fincommerce/block-library/packages/checkout/slot';
import TotalsWrapper from '@fincommerce/block-library/packages/components/totals-wrapper';

const slotName = '__experimentalDiscountsMeta';

const { Fill: ExperimentalDiscountsMeta, Slot: DiscountsMetaSlot } =
	createSlotFill( slotName );

const Slot = ( { className, extensions, cart, context } ) => {
	const fills = useSlotFills( slotName );
	return (
		hasValidFills( fills ) && (
			<TotalsWrapper slotWrapper={ true }>
				<DiscountsMetaSlot
					className={ clsx(
						className,
						'wc-block-components-discounts-meta'
					) }
					fillProps={ { extensions, cart, context } }
				/>
			</TotalsWrapper>
		)
	);
};

ExperimentalDiscountsMeta.Slot = Slot;

export default ExperimentalDiscountsMeta;
