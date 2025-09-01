/**
 * Internal dependencies
 */
import { StoreNoticesState } from '@fincommerce/block-library/assets/js/data/store-notices/default-state';

export const getRegisteredContainers = (
	state: StoreNoticesState
): StoreNoticesState[ 'containers' ] => state.containers;
