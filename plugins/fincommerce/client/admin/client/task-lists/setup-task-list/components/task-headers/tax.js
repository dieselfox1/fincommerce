/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { WC_ASSET_URL } from '../../../../utils/admin-settings';

const TaxHeader = ( { task, goToTask } ) => {
	return (
		<div className="fincommerce-task-header__contents-container">
			<img
				alt={ __( 'Tax illustration', 'fincommerce' ) }
				src={ WC_ASSET_URL + 'images/task_list/tax-illustration.svg' }
				className="svg-background"
			/>
			<div className="fincommerce-task-header__contents">
				<h1>{ __( 'Configure your tax settings', 'fincommerce' ) }</h1>
				<p>
					{ __(
						'Choose to set up your tax rates manually, or use one of our tax automation tools.',
						'fincommerce'
					) }
				</p>
				<Button
					isSecondary={ task.isComplete }
					isPrimary={ ! task.isComplete }
					onClick={ goToTask }
				>
					{ __( 'Collect sales tax', 'fincommerce' ) }
				</Button>
			</div>
		</div>
	);
};

export default TaxHeader;
