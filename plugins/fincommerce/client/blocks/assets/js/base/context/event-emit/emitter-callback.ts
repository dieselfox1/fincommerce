/**
 * Internal dependencies
 */
import { actions } from '@fincommerce/block-library/assets/js/base/context/event-emit/reducer';
import type { ActionType, ActionCallbackType } from '@fincommerce/block-library/assets/js/base/context/event-emit/types';

export const emitterCallback =
	( type: string, observerDispatch: React.Dispatch< ActionType > ) =>
	( callback: ActionCallbackType, priority = 10 ): ( () => void ) => {
		const action = actions.addEventCallback( type, callback, priority );
		observerDispatch( action );
		return () => {
			observerDispatch( actions.removeEventCallback( type, action.id ) );
		};
	};
