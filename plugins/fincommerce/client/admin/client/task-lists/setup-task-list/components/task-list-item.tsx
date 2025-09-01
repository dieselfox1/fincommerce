/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { onboardingStore, TaskType } from '@fincommerce/data';
import { TaskItem, useSlot } from '@fincommerce/experimental';
import { useCallback } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

import { WooOnboardingTaskListItem } from '@fincommerce/onboarding';
import clsx from 'clsx';

export type TaskListItemProps = {
	task: TaskType;
	activeTaskId: string;
	taskIndex: number;
	goToTask: () => void;
	trackClick: () => void;
};

export const TaskListItem = ( {
	task,
	activeTaskId,
	taskIndex,
	goToTask,
	trackClick,
}: TaskListItemProps ) => {
	const { createNotice } = useDispatch( 'core/notices' );
	const { dismissTask, undoDismissTask } = useDispatch( onboardingStore );

	const {
		id: taskId,
		title,
		badge,
		content,
		time,
		actionLabel,
		isInProgress,
		inProgressLabel,
		isComplete,
		additionalInfo,
		isDismissable,
	} = task;

	const slot = useSlot( `fincommerce_onboarding_task_list_item_${ taskId }` );
	const hasFills = Boolean( slot?.fills?.length );

	const onDismissTask = ( onDismiss?: () => void ) => {
		dismissTask( taskId );
		createNotice( 'success', __( 'Task dismissed', 'fincommerce' ), {
			actions: [
				{
					label: __( 'Undo', 'fincommerce' ),
					onClick: () => undoDismissTask( taskId ),
				},
			],
		} );

		if ( onDismiss ) {
			onDismiss();
		}
	};

	const DefaultTaskItem = useCallback(
		( props: { onClick?: () => void; isClickable?: boolean } ) => {
			const className = clsx(
				'fincommerce-task-list__item index-' + taskIndex,
				{
					in_progress: isInProgress,
					complete: isComplete,
					'is-active': taskId === activeTaskId,
				}
			);

			const onClick = ( e: React.MouseEvent< HTMLButtonElement > ) => {
				if ( ( e.target as HTMLElement ).tagName === 'A' ) {
					return;
				}
				if ( props.onClick ) {
					trackClick();
					return props.onClick();
				}
				goToTask();
			};

			return (
				<TaskItem
					key={ taskId }
					className={ className }
					title={ title }
					badge={ badge }
					inProgress={ isInProgress }
					inProgressLabel={ inProgressLabel }
					completed={ isComplete }
					additionalInfo={ additionalInfo }
					content={ content }
					onClick={
						props.isClickable === false ? undefined : onClick
					}
					onDismiss={
						isDismissable ? () => onDismissTask() : undefined
					}
					action={ () => {} }
					actionLabel={ actionLabel }
				/>
			);
		},
		[
			taskId,
			title,
			badge,
			content,
			time,
			actionLabel,
			isComplete,
			activeTaskId,
		]
	);

	return hasFills ? (
		<WooOnboardingTaskListItem.Slot
			id={ taskId }
			fillProps={ {
				defaultTaskItem: DefaultTaskItem,
				isComplete,
			} }
		/>
	) : (
		<DefaultTaskItem />
	);
};
