import { Slot, Fill } from '@wordpress/components';
import { createElement, Fragment } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { createOrderedChildren } from '../../utils';
const DEFAULT_TAB_ORDER = 20;
export const WooProductTabItem = ({ children, tabProps, templates, }) => {
    if (!templates) {
        // eslint-disable-next-line no-console
        console.warn('WooProductTabItem fill is missing templates property.');
        return null;
    }
    return (createElement(Fragment, null, templates.map((templateData) => (createElement(Fill, { name: `fincommerce_product_tab_${templateData.name}`, key: templateData.name }, (fillProps) => {
        return createOrderedChildren(children, templateData.order || DEFAULT_TAB_ORDER, {}, {
            tabProps,
            templateName: templateData.name,
            order: templateData.order || DEFAULT_TAB_ORDER,
            ...fillProps,
        });
    })))));
};
WooProductTabItem.Slot = ({ fillProps, template, children }) => (createElement(Slot, { name: `fincommerce_product_tab_${template}`, fillProps: fillProps }, (fills) => {
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
