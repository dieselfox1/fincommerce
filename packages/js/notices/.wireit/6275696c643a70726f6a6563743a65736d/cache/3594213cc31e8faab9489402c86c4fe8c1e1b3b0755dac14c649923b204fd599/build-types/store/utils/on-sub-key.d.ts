/**
 * External dependencies
 */
import type { Reducer } from 'redux';
/**
 * Internal dependencies
 */
import { State, Notices } from '../types';
import { Action } from '../actions';
/**
 * Higher-order reducer creator which creates a combined reducer object, keyed
 * by a property on the action object.
 *
 * @param {string} actionProperty Action property by which to key object.
 *
 * @return {Function} Higher-order reducer.
 */
export declare const onSubKey: (actionProperty: keyof Action) => (reducer: Reducer<Notices, Action>) => (state: State | undefined, action: Action) => State;
export default onSubKey;
//# sourceMappingURL=on-sub-key.d.ts.map