/**
 * External dependencies
 */
import { registerStore } from '@wordpress/data';
/**
 * Internal dependencies
 */
import reducer from './reducer';
import * as actions from './actions';
import * as selectors from './selectors';
export * from './types';
export const STORE_NAME = 'core/notices2';
// NOTE: This uses core/notices2, if this file is copied back upstream
// to Gutenberg this needs to be changed back to core/notices.
// @ts-expect-error - react-18-upgrade registerStore is deprecated - migrate to register()
export default registerStore(STORE_NAME, {
    reducer: reducer,
    actions,
    selectors,
});
