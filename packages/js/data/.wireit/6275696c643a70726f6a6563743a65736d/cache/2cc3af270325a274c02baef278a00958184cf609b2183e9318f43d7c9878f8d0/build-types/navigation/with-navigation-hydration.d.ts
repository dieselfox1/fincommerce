import type { ComponentType } from 'react';
import { MenuItem } from './types';
/**
 * Higher-order component used to hydrate navigation data.
 *
 * @param {Object}     data           Data object with menu items and site information.
 * @param {MenuItem[]} data.menuItems Menu items to hydrate.
 */
export declare const withNavigationHydration: (data: {
    menuItems: MenuItem[];
}) => (Inner: ComponentType<Record<string, unknown>>) => ComponentType<Record<string, unknown>>;
//# sourceMappingURL=with-navigation-hydration.d.ts.map