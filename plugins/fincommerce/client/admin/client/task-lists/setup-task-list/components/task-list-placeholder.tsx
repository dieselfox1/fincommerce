/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Internal dependencies
 */

type TasksPlaceholderProps = {
	numTasks?: number;
	twoColumns?: boolean;
	query: {
		task?: string;
	};
};

export const TaskListPlaceholder = ( props: TasksPlaceholderProps ) => {
	const { numTasks = 5 } = props;

	return (
		<div
			className={ clsx(
				'fincommerce-task-dashboard__container setup-task-list'
			) }
		>
			<div className="components-card is-size-large fincommerce-task-card fincommerce-homescreen-card is-loading">
				<div className="components-card__header is-size-medium">
					<div className="fincommerce-task-card__header">
						<div className="is-placeholder"> </div>
					</div>
				</div>
				<ul className="fincommerce-experimental-list">
					{ Array.from( new Array( numTasks ) ).map( ( v, i ) => (
						<li
							tabIndex={ i }
							key={ i }
							className="fincommerce-experimental-list__item fincommerce-task-list__item"
						>
							<div className="fincommerce-task-list__item-before">
								<div className="is-placeholder"></div>
							</div>
							<div className="fincommerce-task-list__item-text">
								<div className="components-truncate components-text is-placeholder"></div>
							</div>
						</li>
					) ) }
				</ul>
			</div>
		</div>
	);
};

export default TaskListPlaceholder;
