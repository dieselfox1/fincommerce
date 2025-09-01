"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionTabs = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const url_1 = require("@wordpress/url");
const site_admin_1 = require("@automattic/site-admin");
const SectionTabs = ({ children, tabs = [], activeSection, }) => {
    const { navigate } = (0, site_admin_1.useHistory)();
    const { query } = (0, site_admin_1.useLocation)();
    const { tab, section } = query || {};
    if (tabs.length <= 1) {
        return (0, element_1.createElement)("div", null, children);
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
        navigate((0, url_1.addQueryArgs)('wc-settings', queryArgs));
    };
    return ((0, element_1.createElement)(components_1.TabPanel, { className: "fincommerce-settings-section-tabs", tabs: tabs, onSelect: onSelect, initialTabName: activeSection || tabs[0].name }, () => (0, element_1.createElement)(element_1.Fragment, null, children)));
};
exports.SectionTabs = SectionTabs;
