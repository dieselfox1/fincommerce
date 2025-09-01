/**
 * External dependencies
 */
import clsx from 'clsx';
import { Button, Card, CardHeader } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import HeaderImage from '../assets/task-list-completed.svg';

export const TaskListCompleted = ( {
	hideTasks,
}: {
	hideTasks: () => void;
} ) => {
	return (
		<>
			<div
				className={ clsx(
					'fincommerce-task-dashboard__container setup-task-list'
				) }
			>
				<Card
					size="large"
					className="fincommerce-task-card fincommerce-homescreen-card completed"
				>
					<CardHeader size="medium">
						<div className="fincommerce-task-card__header">
							<img src={ HeaderImage } alt="Completed" />
							<h2>
								{ __(
									'You’ve completed store setup',
									'fincommerce'
								) }
							</h2>
							<Button variant="primary" onClick={ hideTasks }>
								{ __( 'Hide this list', 'fincommerce' ) }
							</Button>
						</div>
					</CardHeader>
				</Card>
			</div>
		</>
	);
};

export default TaskListCompleted;
