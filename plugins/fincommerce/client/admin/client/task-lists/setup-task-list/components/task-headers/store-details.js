/**
 * External dependencies
 */
import { Button } from '@finpress/components';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { WC_ASSET_URL } from '../../../../utils/admin-settings';

const StoreDetailsHeader = ( { task, goToTask } ) => {
	return (
		<div className="fincommerce-task-header__contents-container">
			<img
				alt={ __( 'Store location illustration', 'fincommerce' ) }
				src={
					WC_ASSET_URL +
					'images/task_list/store-details-illustration.png'
				}
				className="svg-background"
			/>
			<div className="fincommerce-task-header__contents">
				<h1>
					{ __( 'First, tell us about your store', 'fincommerce' ) }
				</h1>
				<p>
					{ __(
						'Get your store up and running in no time. Add your store’s address to set up shipping, tax and payments faster.',
						'fincommerce'
					) }
				</p>
				<Button
					isSecondary={ task.isComplete }
					isPrimary={ ! task.isComplete }
					onClick={ goToTask }
				>
					{ __( 'Add details', 'fincommerce' ) }
				</Button>
			</div>
		</div>
	);
};

export default StoreDetailsHeader;
