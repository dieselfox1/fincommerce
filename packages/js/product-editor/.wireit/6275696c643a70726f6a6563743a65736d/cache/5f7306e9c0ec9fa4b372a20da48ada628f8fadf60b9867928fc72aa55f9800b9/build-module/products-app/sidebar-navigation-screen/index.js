/**
 * External dependencies
 */
import { isRTL, __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { chevronRight, chevronLeft } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { privateApis as routerPrivateApis } from '@wordpress/router';
import { createElement, Fragment } from '@wordpress/element';
import { __experimentalHStack as HStack, __experimentalHeading as Heading, __experimentalVStack as VStack, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import SidebarButton from './sidebar-button';
const { useHistory, useLocation } = unlock(routerPrivateApis);
export default function SidebarNavigationScreen({ isRoot, title, actions, meta, content, footer, description, backPath: backPathProp, }) {
    const { dashboardLink, dashboardLinkText } = useSelect((select) => {
        const { getSettings } = unlock(select('core/edit-site'));
        return {
            dashboardLink: getSettings().__experimentalDashboardLink,
            dashboardLinkText: getSettings().__experimentalDashboardLinkText,
        };
    }, []);
    const location = useLocation();
    const history = useHistory();
    const backPath = backPathProp ?? location.state?.backPath;
    const icon = isRTL() ? chevronRight : chevronLeft;
    return (createElement(Fragment, null,
        createElement(VStack, { className: clsx('edit-site-sidebar-navigation-screen__main', {
                'has-footer': !!footer,
            }), spacing: 0, justify: "flex-start" },
            createElement(HStack, { spacing: 3, alignment: "flex-start", className: "edit-site-sidebar-navigation-screen__title-icon" },
                !isRoot && (createElement(SidebarButton, { onClick: () => {
                        history.push(backPath);
                    }, icon: icon, label: __('Back', 'fincommerce'), showTooltip: false })),
                isRoot && (createElement(SidebarButton, { icon: icon, label: dashboardLinkText ||
                        __('Go to the Dashboard', 'fincommerce'), href: dashboardLink || 'index.php' })),
                createElement(Heading, { as: "h1", className: "edit-site-sidebar-navigation-screen__title", color: '#e0e0e0' /* $gray-200 */, level: 1 }, title),
                actions && (createElement("div", { className: "edit-site-sidebar-navigation-screen__actions" }, actions))),
            meta && (createElement(Fragment, null,
                createElement("div", { className: "edit-site-sidebar-navigation-screen__meta" }, meta))),
            createElement("div", { className: "edit-site-sidebar-navigation-screen__content" },
                description && (createElement("p", { className: "edit-site-sidebar-navigation-screen__description" }, description)),
                content)),
        footer && (createElement("footer", { className: "edit-site-sidebar-navigation-screen__footer" }, footer))));
}
