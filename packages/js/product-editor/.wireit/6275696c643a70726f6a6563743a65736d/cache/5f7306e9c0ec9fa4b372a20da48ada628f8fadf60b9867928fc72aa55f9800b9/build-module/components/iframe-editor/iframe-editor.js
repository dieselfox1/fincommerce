import { Popover } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { createElement, useCallback, useEffect, useReducer, useState, } from '@wordpress/element';
import { useResizeObserver } from '@wordpress/compose';
import { PluginArea } from '@wordpress/plugins';
import clsx from 'clsx';
import { store as preferencesStore,
// @ts-expect-error No types for this exist yet.
 } from '@wordpress/preferences';
// eslint-disable-next-line @fincommerce/dependency-group
import { BlockEditorProvider, BlockList, 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
BlockTools, BlockEditorKeyboardShortcuts, 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
store as blockEditorStore, } from '@wordpress/block-editor';
// eslint-disable-next-line @fincommerce/dependency-group
import { ComplementaryArea,
// @ts-expect-error No types for this exist yet.
 } from '@wordpress/interface';
/**
 * Internal dependencies
 */
import { BackButton } from './back-button';
import { EditorCanvas } from './editor-canvas';
import { EditorContext } from './context';
import { HeaderToolbar } from './header-toolbar/header-toolbar';
import { RegisterStores } from './RegisterStores';
import { ResizableEditor } from './resizable-editor';
import { SecondarySidebar } from './secondary-sidebar/secondary-sidebar';
import { SettingsSidebar } from './sidebar/settings-sidebar';
import { useEditorHistory } from './hooks/use-editor-history';
import { wooProductEditorUiStore } from '../../store/product-editor-ui';
import { SIDEBAR_COMPLEMENTARY_AREA_SCOPE } from './constants';
import { KeyboardShortcuts, RegisterKeyboardShortcuts, } from './keyboard-shortcuts';
import { areBlocksEmpty } from './utils/are-blocks-empty';
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
export function IframeEditor({ onChange = () => { }, onClose, onInput = () => { }, settings: __settings, showBackButton = false, name, }) {
    const [resizeObserver] = useResizeObserver();
    const [temporalBlocks, setTemporalBlocks] = useState([]);
    // Pick the blocks from the store.
    const blocks = useSelect((select) => {
        return select(wooProductEditorUiStore).getModalEditorBlocks();
    }, []);
    const { setModalEditorBlocks: setBlocks, setModalEditorContentHasChanged } = useDispatch(wooProductEditorUiStore);
    const { appendEdit: appendToEditorHistory, hasRedo, hasUndo, redo, undo, } = useEditorHistory({
        setBlocks: setTemporalBlocks,
    });
    /*
     * Set the initial blocks from the store.
     * @todo: probably we can get rid of the initialBlocks prop.
     */
    useEffect(() => {
        appendToEditorHistory(blocks);
        setTemporalBlocks(blocks);
    }, []); // eslint-disable-line
    const [{ isInserterOpened, isListViewOpened }, dispatch] = useReducer(sidebarReducer, initialSidebarState);
    const setIsInserterOpened = useCallback((value) => {
        dispatch({
            type: setIsInserterOpenedAction,
            value,
        });
    }, []);
    const setIsListViewOpened = useCallback((value) => {
        dispatch({
            type: setIsListViewOpenedAction,
            value,
        });
    }, []);
    const { clearSelectedBlock, updateSettings } = useDispatch(blockEditorStore);
    const parentEditorSettings = useSelect((select) => {
        // @ts-expect-error Selector is not typed
        return select(blockEditorStore).getSettings();
    }, []);
    const { hasFixedToolbar } = useSelect((select) => {
        const { get: getPreference } = select(preferencesStore);
        return {
            hasFixedToolbar: getPreference('core', 'fixedToolbar'),
        };
    }, []);
    useEffect(() => {
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
    return (createElement("div", { className: "fincommerce-iframe-editor" },
        createElement(EditorContext.Provider, { value: {
                hasRedo,
                hasUndo,
                isInserterOpened,
                isDocumentOverviewOpened: isListViewOpened,
                redo,
                setIsInserterOpened,
                setIsDocumentOverviewOpened: setIsListViewOpened,
                undo,
            } },
            createElement(BlockEditorProvider, { settings: {
                    ...settings,
                    hasFixedToolbar,
                    templateLock: false,
                }, value: temporalBlocks, onChange: handleBlockEditorProviderOnChange, onInput: handleBlockEditorProviderOnInput, useSubRegistry: true },
                createElement(RegisterStores, null),
                createElement(KeyboardShortcuts, null),
                createElement(RegisterKeyboardShortcuts, null),
                createElement(HeaderToolbar, { onSave: () => {
                        setBlocks(areBlocksEmpty(temporalBlocks)
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
                createElement("div", { className: "fincommerce-iframe-editor__main" },
                    createElement(SecondarySidebar, null),
                    createElement(BlockTools, { className: clsx('fincommerce-iframe-editor__content'), onClick: (event) => {
                            // Clear selected block when clicking on the gray background.
                            if (event.target === event.currentTarget) {
                                clearSelectedBlock();
                            }
                        } },
                        createElement(BlockEditorKeyboardShortcuts.Register, null),
                        showBackButton && onClose && (createElement(BackButton, { onClick: () => {
                                setTimeout(onClose, 550);
                            } })),
                        createElement(ResizableEditor, { enableResizing: true, 
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore This accepts numbers or strings.
                            height: "100%" },
                            createElement(EditorCanvas, { enableResizing: true, settings: settings },
                                resizeObserver,
                                createElement(BlockList, { className: "edit-site-block-editor__block-list wp-site-blocks" })),
                            createElement(Popover.Slot, null)),
                        createElement("div", { className: "fincommerce-iframe-editor__content-inserter-clipper" })),
                    createElement(ComplementaryArea.Slot, { scope: SIDEBAR_COMPLEMENTARY_AREA_SCOPE })),
                createElement(PluginArea, { scope: "fincommerce-product-editor-modal-block-editor" }),
                createElement(SettingsSidebar, { smallScreenTitle: name })))));
}
