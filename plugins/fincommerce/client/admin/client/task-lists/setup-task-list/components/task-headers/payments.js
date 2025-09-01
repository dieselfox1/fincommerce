/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { WC_ASSET_URL } from '../../../../utils/admin-settings';

const PaymentsHeader = ( { task, goToTask } ) => {
	return (
		<div className="fincommerce-task-header__contents-container">
			<img
				alt={ __( 'Payment illustration', 'fincommerce' ) }
				src={
					WC_ASSET_URL + 'images/task_list/payment-illustration.svg'
				}
				className="svg-background"
			/>
			<div className="fincommerce-task-header__contents">
				<h1>{ __( 'It’s time to get paid', 'fincommerce' ) }</h1>
				<p>
					{ __(
						'Give your customers an easy and convenient way to pay! Set up one (or more!) of our fast and secure online or in person payment methods.',
						'fincommerce'
					) }
				</p>
				<Button
					isSecondary={ task.isComplete }
					isPrimary={ ! task.isComplete }
					onClick={ goToTask }
				>
					{ __( 'Get paid', 'fincommerce' ) }
				</Button>
			</div>
		</div>
	);
};

export default PaymentsHeader;
