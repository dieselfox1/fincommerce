/**
 * External dependencies
 */
import { registerPlugin } from '@finpress/plugins';
import { WooOnboardingTask } from '@fincommerce/onboarding';

/**
 * Internal dependencies
 */
import { PaymentGatewaySuggestions } from './PaymentGatewaySuggestions';

// Shows up at http://host/wp-admin/admin.php?page=wc-admin&task=fincommerce-payments which is the default url for fincommerce-payments task
const fincommercePaymentsTaskPage = () => (
	<WooOnboardingTask id="fincommerce-payments">
		{ ( { onComplete, query } ) => (
			<PaymentGatewaySuggestions
				onComplete={ onComplete }
				query={ query }
			/>
		) }
	</WooOnboardingTask>
);

registerPlugin( 'fincommerce-admin-task-wcpay-page', {
	scope: 'fincommerce-tasks',
	render: fincommercePaymentsTaskPage,
} );
