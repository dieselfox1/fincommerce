"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IframeEditor = IframeEditor;
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const compose_1 = require("@wordpress/compose");
const plugins_1 = require("@wordpress/plugins");
const clsx_1 = __importDefault(require("clsx"));
const preferences_1 = require("@wordpress/preferences");
// eslint-disable-next-line @fincommerce/dependency-group
const block_editor_1 = require("@wordpress/block-editor");
// eslint-disable-next-line @fincommerce/dependency-group
const interface_1 = require("@wordpress/interface");
/**
 * Internal dependencies
 */
const back_button_1 = require("./back-button");
const editor_canvas_1 = require("./editor-canvas");
const context_1 = require("./context");
const header_toolbar_1 = require("./header-toolbar/header-toolbar");
const RegisterStores_1 = require("./RegisterStores");
const resizable_editor_1 = require("./resizable-editor");
const secondary_sidebar_1 = require("./secondary-sidebar/secondary-sidebar");
const settings_sidebar_1 = require("./sidebar/settings-sidebar");
const use_editor_history_1 = require("./hooks/use-editor-history");
const product_editor_ui_1 = require("../../store/product-editor-ui");
const constants_1 = require("./constants");
const keyboard_shortcuts_1 = require("./keyboard-shortcuts");
const are_blocks_empty_1 = require("./utils/are-blocks-empty");
const setIsInserterOpenedAction = 'SET_IS_INSERTER_OPENED';
const setIsListViewOpenedAction = 'SET_IS_LISTVIEW_OPENED';
const initialSidebarState = {
    isInserterOpened: false,
    isListViewOpened: false,
};
function sidebarReducer(state, action) {
    switch (action.type) {
        case setIsInserterOpenedAction: {
            return {
                ...state,
                isInserterOpened: action.value,
                isListViewOpened: action.value ? false : state.isListViewOpened,
            };
        }
        case setIsListViewOpenedAction: {
            return {
                ...state,
                isListViewOpened: action.value,
                isInserterOpened: action.value ? false : state.isInserterOpened,
            };
        }
    }
    return state;
}
function IframeEditor({ onChange = () => { }, onClose, onInput = () => { }, settings: __settings, showBackButton = false, name, }) {
    const [resizeObserver] = (0, compose_1.useResizeObserver)();
    const [temporalBlocks, setTemporalBlocks] = (0, element_1.useState)([]);
    // Pick the blocks from the store.
    const blocks = (0, data_1.useSelect)((select) => {
        return select(product_editor_ui_1.wooProductEditorUiStore).getModalEditorBlocks();
    }, []);
    const { setModalEditorBlocks: setBlocks, setModalEditorContentHasChanged } = (0, data_1.useDispatch)(product_editor_ui_1.wooProductEditorUiStore);
    const { appendEdit: appendToEditorHistory, hasRedo, hasUndo, redo, undo, } = (0, use_editor_history_1.useEditorHistory)({
        setBlocks: setTemporalBlocks,
    });
    /*
     * Set the initial blocks from the store.
     * @todo: probably we can get rid of the initialBlocks prop.
     */
    (0, element_1.useEffect)(() => {
        appendToEditorHistory(blocks);
        setTemporalBlocks(blocks);
    }, []); // eslint-disable-line
    const [{ isInserterOpened, isListViewOpened }, dispatch] = (0, element_1.useReducer)(sidebarReducer, initialSidebarState);
    const setIsInserterOpened = (0, element_1.useCallback)((value) => {
        dispatch({
            type: setIsInserterOpenedAction,
            value,
        });
    }, []);
    const setIsListViewOpened = (0, element_1.useCallback)((value) => {
        dispatch({
            type: setIsListViewOpenedAction,
            value,
        });
    }, []);
    const { clearSelectedBlock, updateSettings } = (0, data_1.useDispatch)(block_editor_1.store);
    const parentEditorSettings = (0, data_1.useSelect)((select) => {
        // @ts-expect-error Selector is not typed
        return select(block_editor_1.store).getSettings();
    }, []);
    const { hasFixedToolbar } = (0, data_1.useSelect)((select) => {
        const { get: getPreference } = select(preferences_1.store);
        return {
            hasFixedToolbar: getPreference('core', 'fixedToolbar'),
        };
    }, []);
    (0, element_1.useEffect)(() => {
        // Manually update the settings so that __unstableResolvedAssets gets added to the data store.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        updateSettings(productBlockEditorSettings);
    }, []);
    const handleBlockEditorProviderOnChange = (updatedBlocks) => {
        appendToEditorHistory(updatedBlocks);
        setTemporalBlocks(updatedBlocks);
        onChange(updatedBlocks);
    };
    const handleBlockEditorProviderOnInput = (updatedBlocks) => {
        appendToEditorHistory(updatedBlocks);
        setTemporalBlocks(updatedBlocks);
        onInput(updatedBlocks);
    };
    const settings = __settings || parentEditorSettings;
    return ((0, element_1.createElement)("div", { className: "fincommerce-iframe-editor" },
        (0, element_1.createElement)(context_1.EditorContext.Provider, { value: {
                hasRedo,
                hasUndo,
                isInserterOpened,
                isDocumentOverviewOpened: isListViewOpened,
                redo,
                setIsInserterOpened,
                setIsDocumentOverviewOpened: setIsListViewOpened,
                undo,
            } },
            (0, element_1.createElement)(block_editor_1.BlockEditorProvider, { settings: {
                    ...settings,
                    hasFixedToolbar,
                    templateLock: false,
                }, value: temporalBlocks, onChange: handleBlockEditorProviderOnChange, onInput: handleBlockEditorProviderOnInput, useSubRegistry: true },
                (0, element_1.createElement)(RegisterStores_1.RegisterStores, null),
                (0, element_1.createElement)(keyboard_shortcuts_1.KeyboardShortcuts, null),
                (0, element_1.createElement)(keyboard_shortcuts_1.RegisterKeyboardShortcuts, null),
                (0, element_1.createElement)(header_toolbar_1.HeaderToolbar, { onSave: () => {
                        setBlocks((0, are_blocks_empty_1.areBlocksEmpty)(temporalBlocks)
                            ? []
                            : temporalBlocks);
                        setModalEditorContentHasChanged(true);
                        onChange(temporalBlocks);
                        onClose?.();
                    }, onCancel: () => {
                        setBlocks(blocks);
                        onChange(blocks);
                        setTemporalBlocks(blocks);
                        onClose?.();
                    } }),
                (0, element_1.createElement)("div", { className: "fincommerce-iframe-editor__main" },
                    (0, element_1.createElement)(secondary_sidebar_1.SecondarySidebar, null),
                    (0, element_1.createElement)(block_editor_1.BlockTools, { className: (0, clsx_1.default)('fincommerce-iframe-editor__content'), onClick: (event) => {
                            // Clear selected block when clicking on the gray background.
                            if (event.target === event.currentTarget) {
                                clearSelectedBlock();
                            }
                        } },
                        (0, element_1.createElement)(block_editor_1.BlockEditorKeyboardShortcuts.Register, null),
                        showBackButton && onClose && ((0, element_1.createElement)(back_button_1.BackButton, { onClick: () => {
                                setTimeout(onClose, 550);
                            } })),
                        (0, element_1.createElement)(resizable_editor_1.ResizableEditor, { enableResizing: true, 
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore This accepts numbers or strings.
                            height: "100%" },
                            (0, element_1.createElement)(editor_canvas_1.EditorCanvas, { enableResizing: true, settings: settings },
                                resizeObserver,
                                (0, element_1.createElement)(block_editor_1.BlockList, { className: "edit-site-block-editor__block-list wp-site-blocks" })),
                            (0, element_1.createElement)(components_1.Popover.Slot, null)),
                        (0, element_1.createElement)("div", { className: "fincommerce-iframe-editor__content-inserter-clipper" })),
                    (0, element_1.createElement)(interface_1.ComplementaryArea.Slot, { scope: constants_1.SIDEBAR_COMPLEMENTARY_AREA_SCOPE })),
                (0, element_1.createElement)(plugins_1.PluginArea, { scope: "fincommerce-product-editor-modal-block-editor" }),
                (0, element_1.createElement)(settings_sidebar_1.SettingsSidebar, { smallScreenTitle: name })))));
}
