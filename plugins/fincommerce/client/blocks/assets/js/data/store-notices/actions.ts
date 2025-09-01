/**
 * Internal dependencies
 */
import { ACTION_TYPES } from '@fincommerce/block-library/assets/js/data/store-notices/action-types';

export const registerContainer = ( containerContext: string ) => {
	return {
		type: ACTION_TYPES.REGISTER_CONTAINER,
		containerContext,
	};
};

export const unregisterContainer = ( containerContext: string ) => {
	return {
		type: ACTION_TYPES.UNREGISTER_CONTAINER,
		containerContext,
	};
};
