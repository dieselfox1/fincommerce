/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { store } from './';
/**
 * Higher-order component used to hydrate current user data.
 *
 * @param {Object} currentUser Current user object in the same format as the WP REST API returns.
 */
export const withCurrentUserHydration = (currentUser) => createHigherOrderComponent((OriginalComponent) => (props) => {
    // Use currentUser to hydrate calls to @wordpress/core-data's getCurrentUser().
    const shouldHydrate = useSelect((select) => {
        if (!currentUser) {
            return;
        }
        const { isResolving, hasFinishedResolution } = select(store);
        return (!isResolving('getCurrentUser', []) &&
            !hasFinishedResolution('getCurrentUser', []));
    }, []);
    const { startResolution, finishResolution, receiveCurrentUser } = useDispatch(store);
    if (shouldHydrate) {
        startResolution('getCurrentUser', []);
        receiveCurrentUser(currentUser);
        finishResolution('getCurrentUser', []);
    }
    return createElement(OriginalComponent, { ...props });
}, 'withCurrentUserHydration');
