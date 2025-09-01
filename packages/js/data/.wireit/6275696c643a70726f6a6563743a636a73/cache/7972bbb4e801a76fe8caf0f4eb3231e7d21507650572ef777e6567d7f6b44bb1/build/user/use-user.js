"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const _1 = require("./");
/**
 * Custom react hook for shortcut methods around user.
 *
 * This is a wrapper around @wordpress/core-data's getCurrentUser().
 */
const useUser = () => {
    const userData = (0, data_1.useSelect)((select) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { getCurrentUser, hasStartedResolution, hasFinishedResolution } = select(_1.store);
        return {
            isRequesting: hasStartedResolution('getCurrentUser', []) &&
                !hasFinishedResolution('getCurrentUser', []),
            // We register additional user data in backend so we need to use a type assertion here for WC user.
            user: getCurrentUser(),
            getCurrentUser,
        };
    }, []);
    const currentUserCan = (capability) => {
        if (userData.user && userData.user.is_super_admin) {
            return true;
        }
        if (userData.user && userData.user.capabilities[capability]) {
            return true;
        }
        return false;
    };
    return {
        currentUserCan,
        user: userData.user,
        isRequesting: userData.isRequesting,
    };
};
exports.useUser = useUser;
