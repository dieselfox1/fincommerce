/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { getNewPath, navigateTo } from '@fincommerce/navigation';
import {
	onboardingStore,
	TaskType,
	useUserPreferences,
} from '@fincommerce/data';
import { recordEvent } from '@fincommerce/tracks';
import { TaskItem, useSlot } from '@fincommerce/experimental';
import { useCallback, useEffect } from '@finpress/element';
import { useDispatch } from '@finpress/data';
import { WooOnboardingTaskListItem } from '@fincommerce/onboarding';
import { useLayoutContext } from '@fincommerce/admin-layout';

/**
 * Internal dependencies
 */
import './task-list.scss';

export type TaskListItemProps = {
	isExpandable: boolean;
	isExpanded: boolean;
	setExpandedTask: ( id: string ) => void;
	task: TaskType & {
		onClick?: () => void;
	};
};

export const TaskListItem = ( {
	isExpandable = false,
	isExpanded = false,
	setExpandedTask,
	task,
}: TaskListItemProps ) => {
	const { createNotice } = useDispatch( 'core/notices' );
	const { layoutString } = useLayoutContext();

	const {
		dismissTask,
		snoozeTask,
		undoDismissTask,
		undoSnoozeTask,
		visitedTask,
		invalidateResolutionForStoreSelector,
	} = useDispatch( onboardingStore );
	const userPreferences = useUserPreferences();

	const {
		actionLabel,
		actionUrl,
		content,
		id,
		isComplete,
		isDismissable,
		isSnoozeable,
		time,
		title,
		badge,
		level,
		additionalInfo,
		recordViewEvent,
	} = task;

	useEffect( () => {
		if ( recordViewEvent ) {
			recordEvent( 'tasklist_item_view', {
				task_name: id,
				is_complete: isComplete,
				context: layoutString,
			} );
		}
		// run the effect only when component mounts
		// eslint-disable-next-line
	}, [] );

	const slot = useSlot( `fincommerce_onboarding_task_list_item_${ id }` );
	const hasFills = Boolean( slot?.fills?.length );

	const onDismiss = useCallback( () => {
		dismissTask( id );
		createNotice( 'success', __( 'Task dismissed', 'fincommerce' ), {
			actions: [
				{
					label: __( 'Undo', 'fincommerce' ),
					onClick: () => undoDismissTask( id ),
				},
			],
		} );
	}, [ id ] );

	const onSnooze = useCallback( () => {
		snoozeTask( id );
		createNotice(
			'success',
			__( 'Task postponed until tomorrow', 'fincommerce' ),
			{
				actions: [
					{
						label: __( 'Undo', 'fincommerce' ),
						onClick: () => undoSnoozeTask( id ),
					},
				],
			}
		);
	}, [ id ] );

	const getTaskStartedCount = () => {
		const trackedStartedTasks =
			userPreferences.task_list_tracked_started_tasks;
		if ( ! trackedStartedTasks || ! trackedStartedTasks[ id ] ) {
			return 0;
		}
		return trackedStartedTasks[ id ];
	};

	// @todo This would be better as a task endpoint that handles updating the count.
	const updateTrackStartedCount = async () => {
		const newCount = getTaskStartedCount() + 1;
		const trackedStartedTasks =
			userPreferences.task_list_tracked_started_tasks || {};

		visitedTask( id );
		await userPreferences.updateUserPreferences( {
			task_list_tracked_started_tasks: {
				...( trackedStartedTasks || {} ),
				[ id ]: newCount,
			},
		} );
	};

	const trackClick = async () => {
		recordEvent( 'tasklist_click', {
			task_name: id,
			context: layoutString,
		} );

		if ( ! isComplete ) {
			await updateTrackStartedCount();
		}
	};

	const onClickDefault = useCallback( () => {
		if ( actionUrl ) {
			navigateTo( {
				url: actionUrl,
			} );
			return;
		}

		navigateTo( { url: getNewPath( { task: id }, '/', {} ) } );
	}, [ id, isComplete, actionUrl ] );

	const taskItemProps = {
		expandable: isExpandable,
		expanded: isExpandable && isExpanded,
		completed: isComplete,
		onSnooze: isSnoozeable ? onSnooze : undefined,
		onDismiss: isDismissable ? onDismiss : undefined,
	};

	const DefaultTaskItem = useCallback(
		( props: Partial< React.ComponentProps< typeof TaskItem > > ) => {
			const onClickActions = (
				event?: React.MouseEvent | React.KeyboardEvent
			) => {
				trackClick().then( () => {
					if ( ! isComplete ) {
						// Invalidate the task list selector cache to force a re-fetch.
						// This ensures the task completion status is up-to-date after visiting a task.
						invalidateResolutionForStoreSelector( 'getTaskLists' );
					}
				} );

				if ( props.onClick ) {
					return props.onClick(
						event as React.MouseEvent< HTMLElement, MouseEvent >
					);
				}

				return onClickDefault();
			};
			return (
				<TaskItem
					key={ id }
					title={ title }
					badge={ badge }
					inProgress={ false } // In progress design is not supported for "Things to do next" task list.
					inProgressLabel={ '' } // In progress design is not supported for "Things to do next" task list.
					content={ content }
					additionalInfo={ additionalInfo }
					time={ time }
					action={ onClickActions }
					level={ level }
					actionLabel={ actionLabel }
					{ ...taskItemProps }
					{ ...props }
					onClick={
						! isExpandable || isComplete
							? onClickActions
							: () => setExpandedTask( id )
					}
				/>
			);
		},
		[
			id,
			title,
			badge,
			content,
			time,
			actionLabel,
			isExpandable,
			isComplete,
		]
	);

	return hasFills ? (
		<WooOnboardingTaskListItem.Slot
			id={ id }
			fillProps={ {
				defaultTaskItem: DefaultTaskItem,
				isComplete,
				...taskItemProps,
			} }
		/>
	) : (
		<DefaultTaskItem onClick={ task.onClick } />
	);
};
