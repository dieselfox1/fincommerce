/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { OrderStatus } from '@fincommerce/components';

const orderStatusMap = {
	processing: __( 'Processing Order', 'fincommerce' ),
	pending: __( 'Pending Order', 'fincommerce' ),
	completed: __( 'Completed Order', 'fincommerce' ),
};

export const Basic = () => (
	<div>
		<OrderStatus
			order={ { status: 'processing' } }
			orderStatusMap={ orderStatusMap }
		/>
		<OrderStatus
			order={ { status: 'pending' } }
			orderStatusMap={ orderStatusMap }
		/>
		<OrderStatus
			order={ { status: 'completed' } }
			orderStatusMap={ orderStatusMap }
		/>
	</div>
);

export default {
	title: 'Components/OrderStatus',
	component: OrderStatus,
};
