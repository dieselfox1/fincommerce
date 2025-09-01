"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderToolbar = HeaderToolbar;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const compose_1 = require("@wordpress/compose");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
const pinned_items_1 = __importDefault(require("@wordpress/interface/build-module/components/pinned-items"));
// eslint-disable-next-line @fincommerce/dependency-group
const preferences_1 = require("@wordpress/preferences");
// eslint-disable-next-line @fincommerce/dependency-group
const block_editor_1 = require("@wordpress/block-editor");
/**
 * Internal dependencies
 */
const context_1 = require("../context");
const editor_history_redo_1 = __importDefault(require("./editor-history-redo"));
const editor_history_undo_1 = __importDefault(require("./editor-history-undo"));
const document_overview_1 = require("./document-overview");
const more_menu_1 = require("./more-menu");
const constants_1 = require("../constants");
function HeaderToolbar({ onSave = () => { }, onCancel = () => { }, }) {
    const { isInserterOpened, setIsInserterOpened } = (0, element_1.useContext)(context_1.EditorContext);
    const [isBlockToolsCollapsed, setIsBlockToolsCollapsed] = (0, element_1.useState)(true);
    const isLargeViewport = (0, compose_1.useViewportMatch)('medium');
    const inserterButton = (0, element_1.useRef)(null);
    const { isInserterEnabled, isTextModeEnabled, hasBlockSelection, hasFixedToolbar, } = (0, data_1.useSelect)((select) => {
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
        getBlockSelectionStart, } = select(block_editor_1.store);
        const { get: getPreference } = select(preferences_1.store);
        return {
            isTextModeEnabled: getEditorMode() === 'text',
            isInserterEnabled: hasInserterItems(getBlockRootClientId(getBlockSelectionEnd() ?? '') ??
                undefined),
            hasBlockSelection: !!getBlockSelectionStart(),
            hasFixedToolbar: getPreference('core', 'fixedToolbar'),
        };
    }, []);
    const toggleInserter = (0, element_1.useCallback)(() => setIsInserterOpened(!isInserterOpened), [isInserterOpened, setIsInserterOpened]);
    (0, element_1.useEffect)(() => {
        // If we have a new block selection, show the block tools
        if (hasBlockSelection) {
            setIsBlockToolsCollapsed(false);
        }
    }, [hasBlockSelection]);
    return ((0, element_1.createElement)("div", { className: "fincommerce-iframe-editor__header" },
        (0, element_1.createElement)("div", { className: "fincommerce-iframe-editor__header-left" },
            (0, element_1.createElement)(block_editor_1.NavigableToolbar, { className: "fincommerce-iframe-editor-document-tools", "aria-label": (0, i18n_1.__)('Document tools', 'fincommerce'), 
                // @ts-expect-error variant prop exists
                variant: "unstyled" },
                (0, element_1.createElement)("div", { className: "fincommerce-iframe-editor-document-tools__left" },
                    (0, element_1.createElement)(components_1.ToolbarItem, { ref: inserterButton, as: components_1.Button, className: "fincommerce-iframe-editor__header-inserter-toggle", 
                        // @ts-expect-error the prop variant is passed to the Button component
                        variant: "primary", isPressed: isInserterOpened, onMouseDown: (event) => {
                            event.preventDefault();
                        }, onClick: toggleInserter, disabled: !isInserterEnabled, icon: icons_1.plus, label: (0, i18n_1.__)('Toggle block inserter', 'fincommerce'), "aria-expanded": isInserterOpened, showTooltip: true }),
                    isLargeViewport && ((0, element_1.createElement)(components_1.ToolbarItem, { as: block_editor_1.ToolSelector, 
                        // @ts-expect-error the prop size is passed to the ToolSelector component
                        disabled: isTextModeEnabled, size: "compact" })),
                    (0, element_1.createElement)(components_1.ToolbarItem, { as: editor_history_undo_1.default, size: "compact" }),
                    (0, element_1.createElement)(components_1.ToolbarItem, { as: editor_history_redo_1.default, size: "compact" }),
                    (0, element_1.createElement)(components_1.ToolbarItem, { as: document_overview_1.DocumentOverview, size: "compact" }))),
            hasFixedToolbar && isLargeViewport && ((0, element_1.createElement)(element_1.Fragment, null,
                (0, element_1.createElement)("div", { className: (0, clsx_1.default)('selected-block-tools-wrapper', {
                        'is-collapsed': isBlockToolsCollapsed,
                    }) },
                    (0, element_1.createElement)(block_editor_1.BlockToolbar, { hideDragHandle: true })),
                (0, element_1.createElement)(components_1.Popover.Slot, { name: "block-toolbar" }),
                hasBlockSelection && ((0, element_1.createElement)(components_1.Button, { className: "edit-post-header__block-tools-toggle", icon: isBlockToolsCollapsed ? icons_1.next : icons_1.previous, onClick: () => {
                        setIsBlockToolsCollapsed((collapsed) => !collapsed);
                    }, label: isBlockToolsCollapsed
                        ? (0, i18n_1.__)('Show block tools', 'fincommerce')
                        : (0, i18n_1.__)('Hide block tools', 'fincommerce') }))))),
        (0, element_1.createElement)("div", { className: "fincommerce-iframe-editor__header-right" },
            (0, element_1.createElement)(components_1.Button, { variant: "tertiary", className: "fincommerce-modal-actions__cancel-button", onClick: onCancel, text: (0, i18n_1.__)('Cancel', 'fincommerce') }),
            (0, element_1.createElement)(components_1.Button, { variant: "primary", className: "fincommerce-modal-actions__done-button", onClick: onSave, text: (0, i18n_1.__)('Done', 'fincommerce') }),
            (0, element_1.createElement)(pinned_items_1.default.Slot, { scope: constants_1.SIDEBAR_COMPLEMENTARY_AREA_SCOPE }),
            (0, element_1.createElement)(more_menu_1.MoreMenu, null))));
}
