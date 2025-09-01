/**
 * External dependencies
 */
import { controls } from '@wordpress/data-controls';
import { createReduxStore, register } from '@wordpress/data';
import deprecated from '@wordpress/deprecated';
/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import * as resolvers from './resolvers';
import initDispatchers from './dispatchers';
// Generic wrapper that applies deprecate() to all functions.
function wrapWithDeprecate(obj) {
    const wrapped = {};
    for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'function') {
            wrapped[key] = function (...args) {
                // onLoad action is automatically called when initDispatchers is called, skip deprecation message.
                if (key !== 'onLoad') {
                    deprecated('Navigation store', {});
                }
                return value.apply(this, args);
            };
        }
        else {
            wrapped[key] = value;
        }
    }
    return wrapped;
}
export const store = createReduxStore(STORE_NAME, {
    reducer,
    actions: wrapWithDeprecate(actions),
    controls,
    selectors: wrapWithDeprecate(selectors),
    resolvers,
});
register(store);
initDispatchers();
export const NAVIGATION_STORE_NAME = STORE_NAME;
