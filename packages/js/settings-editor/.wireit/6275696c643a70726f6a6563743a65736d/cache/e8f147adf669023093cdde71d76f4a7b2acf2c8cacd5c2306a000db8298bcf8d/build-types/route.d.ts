import { Route } from './types';
/**
 * Hook to get the modern settings pages.
 *
 * @return {Record<string, Route>} The pages.
 */
export declare function useModernRoutes(): Record<string, Route>;
/**
 * Hook to determine and return the active route based on the current path.
 */
export declare const useActiveRoute: () => {
    route: Route;
    settingsPage?: SettingsPage;
    activePage?: string;
    activeSection?: string;
    tabs?: Array<{
        name: string;
        title: string;
    }>;
};
//# sourceMappingURL=route.d.ts.map