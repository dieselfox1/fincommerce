"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = Editor;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const admin_layout_1 = require("@fincommerce/admin-layout");
const navigation_1 = require("@fincommerce/navigation");
const data_1 = require("@wordpress/data");
const components_1 = require("@wordpress/components");
const interface_skeleton_1 = __importDefault(require("@wordpress/interface/build-module/components/interface-skeleton"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
const core_data_1 = require("@wordpress/core-data");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
const keyboard_shortcuts_1 = require("@wordpress/keyboard-shortcuts");
/**
 * Internal dependencies
 */
const header_1 = require("../header");
const block_editor_1 = require("../block-editor");
const editor_loading_context_1 = require("../../contexts/editor-loading-context");
const validation_context_1 = require("../../contexts/validation-context");
const product_editor_ui_1 = require("../../store/product-editor-ui");
const prepublish_panel_1 = require("../prepublish-panel/prepublish-panel");
function Editor({ productId, postType = 'product' }) {
    const [isEditorLoading, setIsEditorLoading] = (0, element_1.useState)(true);
    const query = (0, navigation_1.getQuery)();
    const selectedTab = query.tab || null;
    const setSelectedTab = (0, element_1.useCallback)((tabId) => {
        (0, navigation_1.navigateTo)({ url: (0, navigation_1.getNewPath)({ tab: tabId }) });
    }, []);
    const updatedLayoutContext = (0, admin_layout_1.useExtendLayout)('product-block-editor');
    // Check if the prepublish sidebar is open from the store.
    const isPrepublishPanelOpen = (0, data_1.useSelect)((select) => {
        return select(product_editor_ui_1.wooProductEditorUiStore).isPrepublishPanelOpen();
    }, []);
    return ((0, element_1.createElement)(admin_layout_1.LayoutContextProvider, { value: updatedLayoutContext },
        (0, element_1.createElement)(element_1.StrictMode, null,
            (0, element_1.createElement)(core_data_1.EntityProvider, { kind: "postType", type: postType, id: productId },
                (0, element_1.createElement)(keyboard_shortcuts_1.ShortcutProvider, null,
                    (0, element_1.createElement)(validation_context_1.ValidationProvider, { postType: postType, productId: productId },
                        (0, element_1.createElement)(editor_loading_context_1.EditorLoadingContext.Provider, { value: isEditorLoading },
                            (0, element_1.createElement)(interface_skeleton_1.default, { header: (0, element_1.createElement)(header_1.Header, { onTabSelect: setSelectedTab, productType: postType, selectedTab: selectedTab }), content: (0, element_1.createElement)(element_1.Fragment, null,
                                    (0, element_1.createElement)(block_editor_1.BlockEditor, { postType: postType, productId: productId, context: {
                                            selectedTab,
                                            postType,
                                            postId: productId,
                                        }, setIsEditorLoading: setIsEditorLoading })), actions: isPrepublishPanelOpen && ((0, element_1.createElement)(prepublish_panel_1.PrepublishPanel, { productType: postType })) })),
                        (0, element_1.createElement)(components_1.Popover.Slot, null)))))));
}
