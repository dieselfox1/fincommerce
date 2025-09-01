/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { createSlotFill, hasValidFills, useSlotFills } from '@fincommerce/block-library/packages/checkout/slot';
import TotalsWrapper from '@fincommerce/block-library/packages/components/totals-wrapper';

const slotName = '__experimentalOrderMeta';

const { Fill: ExperimentalOrderMeta, Slot: OrderMetaSlot } =
	createSlotFill( slotName );

const Slot = ( { className, extensions, cart, context } ) => {
	const fills = useSlotFills( slotName );

	return (
		hasValidFills( fills ) && (
			<TotalsWrapper slotWrapper={ true }>
				<OrderMetaSlot
					className={ clsx(
						className,
						'wc-block-components-order-meta'
					) }
					fillProps={ { extensions, cart, context } }
				/>
			</TotalsWrapper>
		)
	);
};

ExperimentalOrderMeta.Slot = Slot;

export default ExperimentalOrderMeta;
