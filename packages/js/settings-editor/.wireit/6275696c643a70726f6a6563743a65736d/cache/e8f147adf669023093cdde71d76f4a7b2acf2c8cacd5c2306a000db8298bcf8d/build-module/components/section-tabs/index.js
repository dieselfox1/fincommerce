/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { TabPanel } from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';
import { useHistory, useLocation } from '@automattic/site-admin';
export const SectionTabs = ({ children, tabs = [], activeSection, }) => {
    const { navigate } = useHistory();
    const { query } = useLocation();
    const { tab, section } = query || {};
    if (tabs.length <= 1) {
        return createElement("div", null, children);
    }
    const onSelect = (tabName) => {
        if (section === tabName) {
            return;
        }
        const queryArgs = tabName === 'default'
            ? {
                tab,
            }
            : {
                tab,
                section: tabName,
            };
        navigate(addQueryArgs('wc-settings', queryArgs));
    };
    return (createElement(TabPanel, { className: "fincommerce-settings-section-tabs", tabs: tabs, onSelect: onSelect, initialTabName: activeSection || tabs[0].name }, () => createElement(Fragment, null, children)));
};
