"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = Tabs;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const react_1 = require("react");
const components_1 = require("@wordpress/components");
const tracks_1 = require("@fincommerce/tracks");
const data_1 = require("@wordpress/data");
const core_data_1 = require("@wordpress/core-data");
/**
 * Internal dependencies
 */
const get_tab_tracks_data_1 = require("./utils/get-tab-tracks-data");
const constants_1 = require("./constants");
function TabFills({ fills, selected, onChange, }) {
    const sortedFills = (0, react_1.useMemo)(function sortFillsByOrder() {
        return [...fills].sort(([{ props: a }], [{ props: b }]) => a.order - b.order);
    }, [fills]);
    (0, element_1.useEffect)(() => {
        // If a tab is already selected, do nothing
        if (selected) {
            return;
        }
        // Select the first tab that is not disabled
        const firstEnabledTab = sortedFills.find((element) => {
            const [{ props }] = element;
            return !props.disabled;
        });
        const tabIdToSelect = firstEnabledTab?.[0]?.props?.children?.key;
        if (tabIdToSelect) {
            onChange(tabIdToSelect);
        }
    }, [sortedFills, selected, onChange]);
    return (0, element_1.createElement)(element_1.Fragment, null, sortedFills);
}
function Tabs({ selected, onChange }) {
    const [productId] = (0, core_data_1.useEntityProp)('postType', 'product', 'id');
    function selectTabOnNavigate(_childIndex, child) {
        child.focus();
    }
    function handleKeyDown(event) {
        const tabs = event?.currentTarget?.querySelectorAll('[role="tab"]');
        switch (event.key) {
            case 'Home':
                event.preventDefault();
                event.stopPropagation();
                const [firstTab] = tabs;
                firstTab?.focus();
                break;
            case 'End':
                event.preventDefault();
                event.stopPropagation();
                const lastTab = tabs[tabs.length - 1];
                lastTab?.focus();
                break;
        }
    }
    function renderFills(fills) {
        return ((0, element_1.createElement)(TabFills, { fills: fills, selected: selected, onChange: onChange }));
    }
    return ((0, element_1.createElement)(components_1.NavigableMenu, { role: "tablist", onNavigate: selectTabOnNavigate, onKeyDown: handleKeyDown, className: "fincommerce-product-tabs", orientation: "horizontal" },
        (0, element_1.createElement)(components_1.Slot, { fillProps: {
                onClick: (tabId) => {
                    onChange(tabId);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const { getEditedEntityRecord } = (0, data_1.select)('core');
                    const product = getEditedEntityRecord('postType', 'product', productId);
                    (0, tracks_1.recordEvent)('product_tab_click', (0, get_tab_tracks_data_1.getTabTracksData)(tabId, product));
                },
            }, name: constants_1.TABS_SLOT_NAME }, renderFills)));
}
