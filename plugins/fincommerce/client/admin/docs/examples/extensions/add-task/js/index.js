/* eslint-disable @finpress/i18n-text-domain */
/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { Card, CardBody } from '@finpress/components';
import { onboardingStore } from '@fincommerce/data';
import { registerPlugin } from '@finpress/plugins';
import { useDispatch } from '@finpress/data';
import {
	WooOnboardingTask,
	WooOnboardingTaskListItem,
} from '@fincommerce/onboarding';

const Task = ( { onComplete, task } ) => {
	const { actionTask } = useDispatch( onboardingStore );
	const { isActioned } = task;

	return (
		<Card className="fincommerce-task-card">
			<CardBody>
				{ __(
					"This task's completion status is dependent on being actioned. The action button below will action this task, while the complete button will optimistically complete the task in the task list and redirect back to the task list. Note that in this example, the task must be actioned for completion to persist.",
					'plugin-domain'
				) }{ ' ' }
				<br />
				<br />
				{ __( 'Task actioned status: ', 'plugin-domain' ) }{ ' ' }
				{ isActioned ? 'actioned' : 'not actioned' }
				<br />
				<br />
				<div>
					<button
						onClick={ () => {
							actionTask( 'my-task' );
						} }
					>
						{ __( 'Action task', 'plugin-domain' ) }
					</button>
					<button onClick={ onComplete }>
						{ __( 'Complete', 'plugin-domain' ) }
					</button>
				</div>
			</CardBody>
		</Card>
	);
};

registerPlugin( 'add-task-content', {
	render: () => (
		<WooOnboardingTask id="my-task">
			{ ( {
				onComplete,
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				query,
				task,
			} ) => <Task onComplete={ onComplete } task={ task } /> }
		</WooOnboardingTask>
	),
	scope: 'fincommerce-tasks',
} );

registerPlugin( 'my-task-list-item-plugin', {
	scope: 'fincommerce-tasks',
	render: () => (
		<WooOnboardingTaskListItem id="my-task">
			{ ( { defaultTaskItem: DefaultTaskItem } ) => (
				// Add a custom wrapper around the default task item.
				<div
					className="fincommerce-custom-tasklist-item"
					style={ {
						border: '1px solid red',
					} }
				>
					<DefaultTaskItem />
				</div>
			) }
		</WooOnboardingTaskListItem>
	),
} );
