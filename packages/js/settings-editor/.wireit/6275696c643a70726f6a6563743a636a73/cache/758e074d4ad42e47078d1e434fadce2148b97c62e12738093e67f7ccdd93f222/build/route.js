"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActiveRoute = void 0;
exports.useModernRoutes = useModernRoutes;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const hooks_1 = require("@wordpress/hooks");
const site_admin_1 = require("@automattic/site-admin");
/**
 * Internal dependencies
 */
const components_1 = require("./components");
const legacy_1 = require("./legacy");
const data_1 = require("./data");
const NotFound = () => {
    return (0, element_1.createElement)("h1", null, (0, i18n_1.__)('Page not found', 'fincommerce'));
};
/**
 * Default route when active page is not found.
 *
 * @param {string}        activePage - The active page.
 * @param {settingsPages} settingsPages      - The settings pages.
 */
const getNotFoundRoute = (activePage, settingsPages) => ({
    key: activePage,
    areas: {
        sidebar: ((0, element_1.createElement)(components_1.Sidebar, { activePage: activePage, pages: settingsPages, pageTitle: (0, i18n_1.__)('Settings', 'fincommerce') })),
        content: (0, element_1.createElement)(NotFound, null),
        edit: null,
    },
    widths: {
        content: undefined,
        edit: undefined,
    },
});
/**
 * Get the tabs for a settings page.
 *
 * @param {settingsPage} settingsPage - The settings page.
 * @return {Array<{ name: string; title: string }>} The tabs.
 */
const getSettingsPageTabs = (settingsPage) => {
    const sections = Object.keys(settingsPage.sections);
    return sections.map((key) => ({
        name: key,
        title: settingsPage.sections[key].label,
    }));
};
/**
 * Creates a route configuration for legacy settings.
 *
 * @param {string}       activePage    - The active page.
 * @param {string}       activeSection - The active section.
 * @param {settingsPage} settingsPage  - The settings page.
 * @param {settingsData} settingsData  - The settings data.
 */
const getLegacyRoute = (activePage, activeSection, settingsPage, settingsData) => {
    return {
        key: activePage,
        areas: {
            sidebar: ((0, element_1.createElement)(components_1.Sidebar, { activePage: activePage, pages: settingsData.pages, pageTitle: (0, i18n_1.__)('Store settings', 'fincommerce') })),
            content: ((0, element_1.createElement)(legacy_1.LegacyContent, { settingsData: settingsData, settingsPage: settingsPage, activeSection: activeSection })),
            edit: null,
        },
        widths: {
            content: undefined,
            edit: undefined,
        },
    };
};
const PAGES_FILTER = 'fincommerce_admin_settings_pages';
const getModernPages = () => {
    /**
     * Get the modern settings pages.
     *
     * @return {Record<string, Route>} The pages.
     */
    return (0, hooks_1.applyFilters)(PAGES_FILTER, {});
};
/**
 * Hook to get the modern settings pages.
 *
 * @return {Record<string, Route>} The pages.
 */
function useModernRoutes() {
    const [routes, setRoutes] = (0, element_1.useState)(getModernPages());
    const location = (0, site_admin_1.useLocation)();
    const isFirstRender = (0, element_1.useRef)(true);
    /*
     * Handler for new pages being added after the initial filter has been run,
     * so that if any routing pages are added later, they can still be rendered
     * instead of falling back to the `NoMatch` page.
     */
    (0, element_1.useEffect)(() => {
        const handleHookAdded = (hookName) => {
            if (hookName !== PAGES_FILTER) {
                return;
            }
            const filterCount = (0, hooks_1.didFilter)(PAGES_FILTER);
            if (filterCount && filterCount > 0) {
                setRoutes(getModernPages());
            }
        };
        const namespace = `dieselfox1/fincommerce/watch_${PAGES_FILTER}`;
        (0, hooks_1.addAction)('hookAdded', namespace, handleHookAdded);
        return () => {
            (0, hooks_1.removeAction)('hookAdded', namespace);
        };
    }, []);
    // Update modern pages when the location changes.
    (0, element_1.useEffect)(() => {
        if (isFirstRender.current) {
            // Prevent updating routes again on first render.
            isFirstRender.current = false;
            return;
        }
        setRoutes(getModernPages());
    }, [location.query]);
    return routes;
}
/**
 * Hook to determine and return the active route based on the current path.
 */
const useActiveRoute = () => {
    const { settingsData } = (0, element_1.useContext)(data_1.SettingsDataContext);
    const location = (0, site_admin_1.useLocation)();
    const modernRoutes = useModernRoutes();
    return (0, element_1.useMemo)(() => {
        const { tab: activePage = 'general', section: activeSection } = location.query || {};
        const settingsPage = settingsData?.pages?.[activePage];
        if (!settingsPage) {
            return {
                route: getNotFoundRoute(activePage, settingsData.pages),
            };
        }
        const tabs = getSettingsPageTabs(settingsPage);
        // Handle legacy pages.
        if (!settingsPage.is_modern) {
            return {
                route: getLegacyRoute(activePage, activeSection || 'default', settingsPage, settingsData),
                settingsPage,
                activePage,
                activeSection,
                tabs,
            };
        }
        const modernRoute = modernRoutes[activePage];
        // Handle modern pages.
        if (!modernRoute) {
            return {
                route: getNotFoundRoute(activePage, settingsData.pages),
            };
        }
        // Sidebar is responsibility of FinCommerce, not extensions so add it here.
        modernRoute.areas.sidebar = ((0, element_1.createElement)(components_1.Sidebar, { activePage: activePage, pages: settingsData.pages, pageTitle: (0, i18n_1.__)('Store settings', 'fincommerce') }));
        // Make sure we have a key.
        modernRoute.key = activePage;
        return {
            route: modernRoute,
            settingsPage,
            activePage,
            activeSection,
            tabs,
        };
    }, [settingsData, location.query]);
};
exports.useActiveRoute = useActiveRoute;
