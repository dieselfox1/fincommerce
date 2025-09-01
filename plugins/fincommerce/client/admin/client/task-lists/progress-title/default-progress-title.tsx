/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { getVisibleTasks, onboardingStore } from '@fincommerce/data';
import { getSetting } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import sanitizeHTML from '../../lib/sanitize-html';

export type DefaultProgressTitleProps = {
	taskListId: string;
};

export const DefaultProgressTitle = ( {
	taskListId,
}: DefaultProgressTitleProps ) => {
	const { loading, tasksCount, completedCount, hasVisitedTasks } = useSelect(
		( select ) => {
			const taskList =
				select( onboardingStore ).getTaskList( taskListId );
			const finishedResolution = select(
				onboardingStore
			).hasFinishedResolution( 'getTaskList', [ taskListId ] );
			const visibleTasks = getVisibleTasks( taskList?.tasks || [] );

			return {
				loading: ! finishedResolution,
				tasksCount: visibleTasks?.length,
				completedCount: visibleTasks?.filter(
					( task ) => task.isComplete
				).length,
				hasVisitedTasks:
					visibleTasks?.filter(
						( task ) =>
							task.isVisited && task.id !== 'store_details'
					).length > 0,
			};
		},
		[ taskListId ]
	);

	const title = useMemo( () => {
		if ( ! hasVisitedTasks || completedCount === tasksCount ) {
			const siteTitle = getSetting( 'siteTitle' );
			return siteTitle
				? sprintf(
						/* translators: %s = site title */
						__( 'Welcome to %s', 'fincommerce' ),
						siteTitle
				  )
				: __( 'Welcome to your store', 'fincommerce' );
		}
		if ( completedCount <= 3 ) {
			return __( 'Let’s get you started', 'fincommerce' ) + '   🚀';
		}
		if ( completedCount > 3 && completedCount < 6 ) {
			return __( 'You’re on the right track', 'fincommerce' );
		}
		return __( 'You’re almost there', 'fincommerce' );
	}, [ completedCount, hasVisitedTasks, tasksCount ] );

	if ( loading ) {
		return null;
	}

	return (
		<h1
			className="fincommerce-task-progress-header__title"
			dangerouslySetInnerHTML={ sanitizeHTML( title ) }
		/>
	);
};
