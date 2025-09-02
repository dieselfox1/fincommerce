/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Button } from '@finpress/components';

/**
 * Internal dependencies
 */
import { WC_ASSET_URL } from '../../../../utils/admin-settings';
import { useAppearanceClick } from '../../../fills/appearance';

const AppearanceHeader = ( { task } ) => {
	const { onClick } = useAppearanceClick();

	const taskTitle = task.title;
	const taskDescription = task.content;
	const taskCta = task.actionLabel;

	return (
		<div className="fincommerce-task-header__contents-container">
			<img
				alt={ __( 'Appearance illustration', 'fincommerce' ) }
				src={
					WC_ASSET_URL +
					'images/task_list/expand-section-illustration.png'
				}
				className="svg-background"
			/>
			<div className="fincommerce-task-header__contents">
				<h1>{ taskTitle }</h1>
				<p>{ taskDescription }</p>
				<Button
					isSecondary={ task.isComplete }
					isPrimary={ ! task.isComplete }
					onClick={ onClick }
				>
					{ taskCta }
				</Button>
			</div>
		</div>
	);
};

export default AppearanceHeader;
