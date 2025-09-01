"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooProductTabItem = void 0;
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const utils_1 = require("../../utils");
const DEFAULT_TAB_ORDER = 20;
const WooProductTabItem = ({ children, tabProps, templates, }) => {
    if (!templates) {
        // eslint-disable-next-line no-console
        console.warn('WooProductTabItem fill is missing templates property.');
        return null;
    }
    return ((0, element_1.createElement)(element_1.Fragment, null, templates.map((templateData) => ((0, element_1.createElement)(components_1.Fill, { name: `fincommerce_product_tab_${templateData.name}`, key: templateData.name }, (fillProps) => {
        return (0, utils_1.createOrderedChildren)(children, templateData.order || DEFAULT_TAB_ORDER, {}, {
            tabProps,
            templateName: templateData.name,
            order: templateData.order || DEFAULT_TAB_ORDER,
            ...fillProps,
        });
    })))));
};
exports.WooProductTabItem = WooProductTabItem;
exports.WooProductTabItem.Slot = ({ fillProps, template, children }) => ((0, element_1.createElement)(components_1.Slot, { name: `fincommerce_product_tab_${template}`, fillProps: fillProps }, (fills) => {
    // @ts-expect-error Slot fill is not typed
    const tabData = fills.reduce(({ childrenMap, tabs, }, fill) => {
        const props = fill[0].props;
        if (props && props.tabProps) {
            childrenMap[props.tabProps.name] = fill[0];
            const tabProps = typeof props.tabProps === 'function'
                ? props.tabProps(fillProps)
                : props.tabProps;
            tabs.push({
                ...tabProps,
                order: props.order ?? DEFAULT_TAB_ORDER,
            });
        }
        return {
            childrenMap,
            tabs,
        };
    }, { childrenMap: {}, tabs: [] });
    const orderedTabs = tabData.tabs.sort((a, b) => {
        return a.order - b.order;
    });
    return children(orderedTabs, tabData.childrenMap);
}));
