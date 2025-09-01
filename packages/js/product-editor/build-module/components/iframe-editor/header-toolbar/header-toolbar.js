/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { useViewportMatch } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { plus, next, previous } from '@wordpress/icons';
import { createElement, useRef, useCallback, useContext, useState, Fragment, useEffect, } from '@wordpress/element';
import clsx from 'clsx';
import { Button, Popover, ToolbarItem } from '@wordpress/components';
import PinnedItems from '@wordpress/interface/build-module/components/pinned-items';
// eslint-disable-next-line @fincommerce/dependency-group
import { store as preferencesStore,
/* @ts-expect-error missing types. */
 } from '@wordpress/preferences';
// eslint-disable-next-line @fincommerce/dependency-group
import { NavigableToolbar, store as blockEditorStore, 
// @ts-expect-error ToolSelector exists in WordPress components.
ToolSelector, BlockToolbar, } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import { EditorContext } from '../context';
import EditorHistoryRedo from './editor-history-redo';
import EditorHistoryUndo from './editor-history-undo';
import { DocumentOverview } from './document-overview';
import { MoreMenu } from './more-menu';
import { SIDEBAR_COMPLEMENTARY_AREA_SCOPE } from '../constants';
export function HeaderToolbar({ onSave = () => { }, onCancel = () => { }, }) {
    const { isInserterOpened, setIsInserterOpened } = useContext(EditorContext);
    const [isBlockToolsCollapsed, setIsBlockToolsCollapsed] = useState(true);
    const isLargeViewport = useViewportMatch('medium');
    const inserterButton = useRef(null);
    const { isInserterEnabled, isTextModeEnabled, hasBlockSelection, hasFixedToolbar, } = useSelect((select) => {
        const { 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore These selectors are available in the block data store.
        hasInserterItems, 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore These selectors are available in the block data store.
        getBlockRootClientId, 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore These selectors are available in the block data store.
        getBlockSelectionEnd, 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore These selectors are available in the block data store.
        __unstableGetEditorMode: getEditorMode, 
        // @ts-expect-error These selectors are available in the block data store.
        getBlockSelectionStart, } = select(blockEditorStore);
        const { get: getPreference } = select(preferencesStore);
        return {
            isTextModeEnabled: getEditorMode() === 'text',
            isInserterEnabled: hasInserterItems(getBlockRootClientId(getBlockSelectionEnd() ?? '') ??
                undefined),
            hasBlockSelection: !!getBlockSelectionStart(),
            hasFixedToolbar: getPreference('core', 'fixedToolbar'),
        };
    }, []);
    const toggleInserter = useCallback(() => setIsInserterOpened(!isInserterOpened), [isInserterOpened, setIsInserterOpened]);
    useEffect(() => {
        // If we have a new block selection, show the block tools
        if (hasBlockSelection) {
            setIsBlockToolsCollapsed(false);
        }
    }, [hasBlockSelection]);
    return (createElement("div", { className: "fincommerce-iframe-editor__header" },
        createElement("div", { className: "fincommerce-iframe-editor__header-left" },
            createElement(NavigableToolbar, { className: "fincommerce-iframe-editor-document-tools", "aria-label": __('Document tools', 'fincommerce'), 
                // @ts-expect-error variant prop exists
                variant: "unstyled" },
                createElement("div", { className: "fincommerce-iframe-editor-document-tools__left" },
                    createElement(ToolbarItem, { ref: inserterButton, as: Button, className: "fincommerce-iframe-editor__header-inserter-toggle", 
                        // @ts-expect-error the prop variant is passed to the Button component
                        variant: "primary", isPressed: isInserterOpened, onMouseDown: (event) => {
                            event.preventDefault();
                        }, onClick: toggleInserter, disabled: !isInserterEnabled, icon: plus, label: __('Toggle block inserter', 'fincommerce'), "aria-expanded": isInserterOpened, showTooltip: true }),
                    isLargeViewport && (createElement(ToolbarItem, { as: ToolSelector, 
                        // @ts-expect-error the prop size is passed to the ToolSelector component
                        disabled: isTextModeEnabled, size: "compact" })),
                    createElement(ToolbarItem, { as: EditorHistoryUndo, size: "compact" }),
                    createElement(ToolbarItem, { as: EditorHistoryRedo, size: "compact" }),
                    createElement(ToolbarItem, { as: DocumentOverview, size: "compact" }))),
            hasFixedToolbar && isLargeViewport && (createElement(Fragment, null,
                createElement("div", { className: clsx('selected-block-tools-wrapper', {
                        'is-collapsed': isBlockToolsCollapsed,
                    }) },
                    createElement(BlockToolbar, { hideDragHandle: true })),
                createElement(Popover.Slot, { name: "block-toolbar" }),
                hasBlockSelection && (createElement(Button, { className: "edit-post-header__block-tools-toggle", icon: isBlockToolsCollapsed ? next : previous, onClick: () => {
                        setIsBlockToolsCollapsed((collapsed) => !collapsed);
                    }, label: isBlockToolsCollapsed
                        ? __('Show block tools', 'fincommerce')
                        : __('Hide block tools', 'fincommerce') }))))),
        createElement("div", { className: "fincommerce-iframe-editor__header-right" },
            createElement(Button, { variant: "tertiary", className: "fincommerce-modal-actions__cancel-button", onClick: onCancel, text: __('Cancel', 'fincommerce') }),
            createElement(Button, { variant: "primary", className: "fincommerce-modal-actions__done-button", onClick: onSave, text: __('Done', 'fincommerce') }),
            createElement(PinnedItems.Slot, { scope: SIDEBAR_COMPLEMENTARY_AREA_SCOPE }),
            createElement(MoreMenu, null))));
}
