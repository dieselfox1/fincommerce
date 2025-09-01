/**
 * External dependencies
 */
import type { Reducer } from 'redux';

/**
 * Internal dependencies
 */
import { defaultStoreNoticesState, StoreNoticesState } from '@fincommerce/block-library/assets/js/data/store-notices/default-state';
import { ACTION_TYPES } from '@fincommerce/block-library/assets/js/data/store-notices/action-types';

const reducer: Reducer< StoreNoticesState > = (
	state = defaultStoreNoticesState,
	action
) => {
	switch ( action.type ) {
		case ACTION_TYPES.REGISTER_CONTAINER:
			return {
				...state,
				containers: [ ...state.containers, action.containerContext ],
			};
		case ACTION_TYPES.UNREGISTER_CONTAINER:
			const newContainers = state.containers.filter(
				( container ) => container !== action.containerContext
			);
			return {
				...state,
				containers: newContainers,
			};
	}
	return state;
};

export default reducer;
