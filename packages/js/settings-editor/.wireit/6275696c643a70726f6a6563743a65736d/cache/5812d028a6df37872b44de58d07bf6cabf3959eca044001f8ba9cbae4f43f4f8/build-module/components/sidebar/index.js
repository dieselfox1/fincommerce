/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { __experimentalItemGroup as ItemGroup } from '@wordpress/components';
import * as IconPackage from '@wordpress/icons';
import { SidebarNavigationScreen, SidebarNavigationItem, } from '@automattic/site-admin';
const { Icon, ...icons } = IconPackage;
const SidebarNavigationScreenContent = ({ activePage, pages, }) => {
    return (createElement(ItemGroup, null, Object.keys(pages).map((slug) => {
        const { label, icon } = pages[slug];
        const isCurrentPage = activePage === slug;
        const to = isCurrentPage
            ? undefined
            : addQueryArgs('wc-settings', { tab: slug });
        return (createElement(SidebarNavigationItem, { icon: icons[icon] ||
                icons.settings, "aria-current": isCurrentPage, uid: slug, key: slug, to: to }, label));
    })));
};
export const Sidebar = ({ activePage, pages, pageTitle, }) => {
    return (createElement(SidebarNavigationScreen, { title: pageTitle, isRoot: true, exitLink: addQueryArgs('admin.php', { page: 'wc-admin' }), content: createElement(SidebarNavigationScreenContent, { activePage: activePage, pages: pages }) }));
};
