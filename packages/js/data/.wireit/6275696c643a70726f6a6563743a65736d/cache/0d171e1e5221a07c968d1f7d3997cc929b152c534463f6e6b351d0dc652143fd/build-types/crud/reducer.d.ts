/**
 * External dependencies
 */
import { Reducer } from 'redux';
/**
 * Internal dependencies
 */
import { Actions } from './actions';
import type { IdType, Item } from './types';
export type Data = Record<IdType, Item>;
export type ResourceState = {
    items: Record<string, {
        data: IdType[];
    }>;
    data: Data;
    itemsCount: Record<string, number>;
    errors: Record<string, unknown>;
    requesting: Record<string, boolean>;
};
export declare const createReducer: (additionalReducer?: Reducer<ResourceState>) => Reducer<ResourceState, Actions>;
//# sourceMappingURL=reducer.d.ts.map