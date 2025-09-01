/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { EllipsisMenu } from '@fincommerce/components';
import { onboardingStore } from '@fincommerce/data';
import { useDispatch } from '@wordpress/data';

export type TaskListMenuProps = {
	id: string;
	hideTaskListText?: string;
};

export const TaskListMenu = ( { id, hideTaskListText }: TaskListMenuProps ) => {
	const { hideTaskList } = useDispatch( onboardingStore );

	return (
		<div className="fincommerce-card__menu fincommerce-card__header-item">
			<EllipsisMenu
				label={ __( 'Task List Options', 'fincommerce' ) }
				renderContent={ () => (
					<div className="fincommerce-task-card__section-controls">
						<Button onClick={ () => hideTaskList( id ) }>
							{ hideTaskListText ||
								__( 'Hide this', 'fincommerce' ) }
						</Button>
					</div>
				) }
			/>
		</div>
	);
};
