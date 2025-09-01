/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { isImportProduct } from '~/task-lists/fills/utils';
import { WC_ASSET_URL } from '../../../../utils/admin-settings';

const ProductsHeader = ( { task, goToTask } ) => {
	const isImportProductHeader = isImportProduct();
	return (
		<div className="fincommerce-task-header__contents-container">
			<img
				alt={ __( 'Products illustration', 'fincommerce' ) }
				src={
					WC_ASSET_URL +
					'images/task_list/sales-section-illustration.svg'
				}
				className="svg-background"
			/>
			<div className="fincommerce-task-header__contents">
				<h1>
					{ isImportProductHeader
						? __( 'Import your products', 'fincommerce' )
						: __( 'List your products', 'fincommerce' ) }
				</h1>
				<p>
					{ __(
						'Start selling by adding products or services to your store. Choose to list products manually, or import them from a different store. ',
						'fincommerce'
					) }
				</p>
				<Button
					isSecondary={ task.isComplete }
					isPrimary={ ! task.isComplete }
					onClick={ goToTask }
				>
					{ isImportProductHeader
						? __( 'Import products', 'fincommerce' )
						: __( 'Add products', 'fincommerce' ) }
				</Button>
			</div>
		</div>
	);
};

export default ProductsHeader;
