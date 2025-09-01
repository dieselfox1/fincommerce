/**
 * External dependencies
 */
import { createElement, useEffect, Fragment } from '@wordpress/element';
import { useMemo } from 'react';
import { NavigableMenu, Slot } from '@wordpress/components';
import { recordEvent } from '@fincommerce/tracks';
import { select } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
/**
 * Internal dependencies
 */
import { getTabTracksData } from './utils/get-tab-tracks-data';
import { TABS_SLOT_NAME } from './constants';
function TabFills({ fills, selected, onChange, }) {
    const sortedFills = useMemo(function sortFillsByOrder() {
        return [...fills].sort(([{ props: a }], [{ props: b }]) => a.order - b.order);
    }, [fills]);
    useEffect(() => {
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
    return createElement(Fragment, null, sortedFills);
}
export function Tabs({ selected, onChange }) {
    const [productId] = useEntityProp('postType', 'product', 'id');
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
        return (createElement(TabFills, { fills: fills, selected: selected, onChange: onChange }));
    }
    return (createElement(NavigableMenu, { role: "tablist", onNavigate: selectTabOnNavigate, onKeyDown: handleKeyDown, className: "fincommerce-product-tabs", orientation: "horizontal" },
        createElement(Slot, { fillProps: {
                onClick: (tabId) => {
                    onChange(tabId);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const { getEditedEntityRecord } = select('core');
                    const product = getEditedEntityRecord('postType', 'product', productId);
                    recordEvent('product_tab_click', getTabTracksData(tabId, product));
                },
            }, name: TABS_SLOT_NAME }, renderFills)));
}
