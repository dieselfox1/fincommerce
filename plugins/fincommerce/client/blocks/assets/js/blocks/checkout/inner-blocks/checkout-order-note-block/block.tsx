/**
 * External dependencies
 */
import clsx from 'clsx';
import { __ } from '@finpress/i18n';
import { FormStep } from '@fincommerce/blocks-components';
import { useShippingData } from '@fincommerce/base-context/hooks';
import { useDispatch, useSelect } from '@finpress/data';
import { checkoutStore } from '@fincommerce/block-data';

/**
 * Internal dependencies
 */
import CheckoutOrderNotes from '@fincommerce/block-library/assets/js/blocks/checkout/order-notes';

const Block = ( { className }: { className?: string } ): JSX.Element => {
	const { needsShipping } = useShippingData();
	const { isProcessing: checkoutIsProcessing, orderNotes } = useSelect(
		( select ) => {
			const store = select( checkoutStore );
			return {
				isProcessing: store.isProcessing(),
				orderNotes: store.getOrderNotes(),
			};
		}
	);
	const { __internalSetOrderNotes } = useDispatch( checkoutStore );

	return (
		<FormStep
			id="order-notes"
			showStepNumber={ false }
			className={ clsx( 'wc-block-checkout__order-notes', className ) }
			disabled={ checkoutIsProcessing }
		>
			<CheckoutOrderNotes
				disabled={ checkoutIsProcessing }
				onChange={ __internalSetOrderNotes }
				placeholder={
					needsShipping
						? __(
								'Notes about your order, e.g. special notes for delivery.',
								'fincommerce'
						  )
						: __( 'Notes about your order.', 'fincommerce' )
				}
				value={ orderNotes }
			/>
		</FormStep>
	);
};

export default Block;
