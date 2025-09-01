import { WCUser } from './types';
/**
 * Higher-order component used to hydrate current user data.
 *
 * @param {Object} currentUser Current user object in the same format as the WP REST API returns.
 */
export declare const withCurrentUserHydration: (currentUser: WCUser) => (Inner: import("react").ComponentType<Record<string, unknown>>) => import("react").ComponentType<Record<string, unknown>>;
//# sourceMappingURL=with-current-user-hydration.d.ts.map