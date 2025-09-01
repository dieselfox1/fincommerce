/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import clsx from 'clsx';
import { privateApis as routerPrivateApis } from '@wordpress/router';
import { addQueryArgs, getQueryArgs, removeQueryArgs } from '@wordpress/url';
import { VIEW_LAYOUTS } from '@wordpress/dataviews';
import { __experimentalHStack as HStack } from '@wordpress/components';
/**
 * Internal dependencies
 */
import SidebarNavigationItem from '../sidebar-navigation-item';
import { unlock } from '../../lock-unlock';
const { useHistory, useLocation } = unlock(routerPrivateApis);
function useLink(params, state, shouldReplace = false) {
    const history = useHistory();
    function onClick(event) {
        event?.preventDefault();
        if (shouldReplace) {
            history.replace(params, state);
        }
        else {
            history.push(params, state);
        }
    }
    const currentArgs = getQueryArgs(window.location.href);
    const currentUrlWithoutArgs = removeQueryArgs(window.location.href, ...Object.keys(currentArgs));
    const newUrl = addQueryArgs(currentUrlWithoutArgs, params);
    return {
        href: newUrl,
        onClick,
    };
}
export default function DataViewItem({ title, slug, customViewId, type, icon, isActive, isCustom, suffix, }) {
    const { params: { postType, page }, } = useLocation();
    const iconToUse = icon || VIEW_LAYOUTS.find((v) => v.type === type)?.icon;
    let activeView = isCustom ? customViewId : slug;
    if (activeView === 'all') {
        activeView = undefined;
    }
    const linkInfo = useLink({
        page,
        postType,
        layout: type,
        activeView,
        isCustom: isCustom ? 'true' : undefined,
    });
    return (createElement(HStack, { justify: "flex-start", className: clsx('edit-site-sidebar-dataviews-dataview-item', {
            'is-selected': isActive,
        }) },
        createElement(SidebarNavigationItem, { icon: iconToUse, ...linkInfo, "aria-current": isActive ? 'true' : undefined }, title),
        suffix));
}
