/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import clsx from 'clsx';
import { createElement, useEffect, useState } from '@wordpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { __experimentalErrorBoundary as ErrorBoundary } from '@fincommerce/components';
/**
 * Internal dependencies
 */
import { TabButton } from './tab-button';
export function TabBlockEdit({ setAttributes, attributes, context, }) {
    const blockProps = useWooBlockProps(attributes);
    const { id, title, _templateBlockOrder: order, isSelected } = attributes;
    const classes = clsx('wp-block-fincommerce-product-tab__content', {
        'is-selected': isSelected,
    });
    const [canRenderChildren, setCanRenderChildren] = useState(false);
    useEffect(() => {
        if (!context.selectedTab)
            return;
        const isSelectedInContext = context.selectedTab === id;
        setAttributes({ isSelected: isSelectedInContext });
        if (isSelectedInContext) {
            setCanRenderChildren(true);
            return;
        }
        const timeoutId = setTimeout(setCanRenderChildren, 300, true);
        return () => clearTimeout(timeoutId);
    }, [context.selectedTab, id, setAttributes]);
    return (createElement("div", { ...blockProps },
        createElement(TabButton, { id: id, selected: isSelected, order: order }, title),
        createElement("div", { id: `fincommerce-product-tab__${id}-content`, "aria-labelledby": `fincommerce-product-tab__${id}`, role: "tabpanel", className: classes },
            createElement(ErrorBoundary, { errorMessage: __('An unexpected error occurred in this tab. Make sure any unsaved changes are saved and then try reloading the page to see if the error recurs.', 'fincommerce'), onError: (error, errorInfo) => {
                    // eslint-disable-next-line no-console
                    console.error(`Error caught in tab '${id}'`, error, errorInfo);
                } }, canRenderChildren && (
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            /* @ts-ignore Content only template locking does exist for this property. */
            createElement(InnerBlocks, { templateLock: "contentOnly" }))))));
}
