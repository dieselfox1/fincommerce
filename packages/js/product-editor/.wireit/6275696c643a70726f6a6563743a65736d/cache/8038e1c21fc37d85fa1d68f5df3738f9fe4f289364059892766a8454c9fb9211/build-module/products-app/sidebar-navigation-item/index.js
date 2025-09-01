/**
 * External dependencies
 */
import { isRTL } from '@wordpress/i18n';
import { chevronRightSmall, chevronLeftSmall, Icon } from '@wordpress/icons';
import { privateApis as routerPrivateApis } from '@wordpress/router';
import clsx from 'clsx';
import { createElement } from '@wordpress/element';
import { __experimentalItem as Item, __experimentalHStack as HStack, FlexBlock, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
const { useHistory } = unlock(routerPrivateApis);
export default function SidebarNavigationItem({ className, icon, withChevron = false, suffix, uid, params, onClick, children, ...props }) {
    const history = useHistory();
    // If there is no custom click handler, create one that navigates to `params`.
    function handleClick(e) {
        if (onClick) {
            onClick(e);
        }
        else if (params) {
            e.preventDefault();
            history.push(params);
        }
    }
    return (createElement(Item, { className: clsx('edit-site-sidebar-navigation-item', { 'with-suffix': !withChevron && suffix }, className), onClick: handleClick, id: uid, ...props },
        createElement(HStack, { justify: "flex-start" },
            icon && (createElement(Icon, { style: { fill: 'currentcolor' }, icon: icon, size: 24 })),
            createElement(FlexBlock, null, children),
            withChevron && (createElement(Icon, { icon: isRTL() ? chevronLeftSmall : chevronRightSmall, className: "edit-site-sidebar-navigation-item__drilldown-indicator", size: 24 })),
            !withChevron && suffix)));
}
