/**
 * Internal dependencies
 */
import './placeholder.scss';

export type TasksPlaceholderProps = {
	numTasks?: number;
	query: {
		task?: string;
	};
};

export const TasksPlaceholder = ( {
	numTasks = 5,
	query,
}: TasksPlaceholderProps ) => {
	const isSingleTask = Boolean( query.task );

	if ( isSingleTask ) {
		return null;
	}

	return (
		<div className="fincommerce-task-dashboard__container">
			<div
				className="fincommerce-card fincommerce-task-card is-loading"
				aria-hidden
			>
				<div className="fincommerce-card__header">
					<div className="fincommerce-card__title-wrapper">
						<div className="fincommerce-card__title fincommerce-card__header-item">
							<span className="is-placeholder" />
						</div>
					</div>
				</div>
				<div className="fincommerce-card__body">
					<div className="fincommerce-list">
						{ Array.from( new Array( numTasks ) ).map( ( v, i ) => (
							<div
								key={ i }
								className="fincommerce-list__item has-action"
							>
								<div className="fincommerce-list__item-inner">
									<div className="fincommerce-list__item-before">
										<span className="is-placeholder" />
									</div>
									<div className="fincommerce-list__item-text">
										<div className="fincommerce-list__item-title">
											<span className="is-placeholder" />
										</div>
									</div>
									<div className="fincommerce-list__item-after">
										<span className="is-placeholder" />
									</div>
								</div>
							</div>
						) ) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default TasksPlaceholder;
