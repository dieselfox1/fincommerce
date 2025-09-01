/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { TaskType } from '@fincommerce/data';
/**
 * Internal dependencies
 */
import { WC_ASSET_URL } from '../../../../utils/admin-settings';

const LaunchYourStoreHeader = ( {
	task,
	goToTask,
}: {
	task: TaskType;
	goToTask: React.MouseEventHandler;
} ) => {
	return (
		<div
			className={ `fincommerce-task-header__contents-container fincommerce-task-header__${ task.id }` }
		>
			<img
				alt={ __( 'Launch Your Store illustration', 'fincommerce' ) }
				src={
					WC_ASSET_URL +
					'images/task_list/launch-your-store-illustration.svg'
				}
				className="svg-background"
			/>
			<div className="fincommerce-task-header__contents">
				<h1>
					{ __( 'Your store is ready for launch!', 'fincommerce' ) }
				</h1>
				<p>
					{ __(
						'It’s time to celebrate – you’re ready to launch your store! Woo! Hit the button to preview your store and make it public.',
						'fincommerce'
					) }
				</p>
				<Button
					variant={ task.isComplete ? 'secondary' : 'primary' }
					onClick={ goToTask }
				>
					{ __( 'Launch store', 'fincommerce' ) }
				</Button>
			</div>
		</div>
	);
};

export default LaunchYourStoreHeader;
