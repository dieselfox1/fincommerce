/**
 * External dependencies
 */
import { ToggleControl } from '@finpress/components';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import FulfillmentCard from '../user-interface/fulfillments-card/card';
import { EnvelopeIcon } from '../../utils/icons';
import { useFulfillmentContext } from '../../context/fulfillment-context';

/**
 * Internal dependencies
 */

export default function CustomerNotificationBox( {
	type = 'fulfill',
}: {
	type: 'fulfill' | 'update' | 'remove';
} ) {
	const { notifyCustomer, setNotifyCustomer } = useFulfillmentContext();

	const headerStrings = {
		fulfill: __( 'Fulfillment notification', 'fincommerce' ),
		remove: __( 'Removal update', 'fincommerce' ),
		update: __( 'Update notification', 'fincommerce' ),
	};

	const contentStrings = {
		fulfill: __(
			'Automatically send an email to the customer when the selected items are fulfilled.',
			'fincommerce'
		),
		remove: __(
			'Automatically send an email to the customer notifying that the fulfillment is cancelled.',
			'fincommerce'
		),
		update: __(
			'Automatically send an email to the customer when the fulfillment is updated.',
			'fincommerce'
		),
	};

	return (
		<FulfillmentCard
			size="small"
			isCollapsable={ false }
			initialState="expanded"
			header={
				<>
					<EnvelopeIcon />
					<h3>{ headerStrings[ type ] || headerStrings.fulfill }</h3>
					<ToggleControl
						__nextHasNoMarginBottom
						checked={ notifyCustomer }
						label={ null }
						onChange={ ( checked ) => {
							setNotifyCustomer( checked );
						} }
					/>
				</>
			}
		>
			<p className="fincommerce-fulfillment-description">
				{ contentStrings[ type ] || contentStrings.fulfill }
			</p>
		</FulfillmentCard>
	);
}
