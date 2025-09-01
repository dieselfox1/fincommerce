"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCurrentUserHydration = void 0;
/**
 * External dependencies
 */
const compose_1 = require("@wordpress/compose");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const _1 = require("./");
/**
 * Higher-order component used to hydrate current user data.
 *
 * @param {Object} currentUser Current user object in the same format as the WP REST API returns.
 */
const withCurrentUserHydration = (currentUser) => (0, compose_1.createHigherOrderComponent)((OriginalComponent) => (props) => {
    // Use currentUser to hydrate calls to @wordpress/core-data's getCurrentUser().
    const shouldHydrate = (0, data_1.useSelect)((select) => {
        if (!currentUser) {
            return;
        }
        const { isResolving, hasFinishedResolution } = select(_1.store);
        return (!isResolving('getCurrentUser', []) &&
            !hasFinishedResolution('getCurrentUser', []));
    }, []);
    const { startResolution, finishResolution, receiveCurrentUser } = (0, data_1.useDispatch)(_1.store);
    if (shouldHydrate) {
        startResolution('getCurrentUser', []);
        receiveCurrentUser(currentUser);
        finishResolution('getCurrentUser', []);
    }
    return (0, element_1.createElement)(OriginalComponent, { ...props });
}, 'withCurrentUserHydration');
exports.withCurrentUserHydration = withCurrentUserHydration;
