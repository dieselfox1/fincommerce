"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockEditor = BlockEditor;
/**
 * External dependencies
 */
const blocks_1 = require("@wordpress/blocks");
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const media_utils_1 = require("@wordpress/media-utils");
const i18n_1 = require("@wordpress/i18n");
const block_templates_1 = require("@fincommerce/block-templates");
const keyboard_shortcuts_1 = require("@wordpress/keyboard-shortcuts");
const navigation_1 = require("@fincommerce/navigation");
const block_editor_1 = require("@wordpress/block-editor");
// It doesn't seem to notice the External dependency block when @ts-ignore is added.
// eslint-disable-next-line @fincommerce/dependency-group
const core_data_1 = require("@wordpress/core-data");
/**
 * Internal dependencies
 */
const use_confirm_unsaved_product_changes_1 = require("../../hooks/use-confirm-unsaved-product-changes");
const use_product_template_1 = require("../../hooks/use-product-template");
const post_type_context_1 = require("../../contexts/post-type-context");
const product_editor_ui_1 = require("../../store/product-editor-ui");
const loading_state_1 = require("./loading-state");
const is_product_form_template_system_enabled_1 = __importDefault(require("../../utils/is-product-form-template-system-enabled"));
const PluginArea = (0, element_1.lazy)(() => Promise.resolve().then(() => __importStar(require('@wordpress/plugins'))).then((module) => ({
    default: module.PluginArea,
})));
const ModalEditor = (0, element_1.lazy)(() => Promise.resolve().then(() => __importStar(require('../modal-editor'))).then((module) => ({
    default: module.ModalEditor,
})));
function getLayoutTemplateId(productTemplate, postType) {
    if (productTemplate?.layoutTemplateId) {
        return productTemplate.layoutTemplateId;
    }
    if (postType === 'product_variation') {
        return 'product-variation';
    }
    // Fallback to simple product if no layout template is set.
    return 'simple-product';
}
function BlockEditor({ context, postType, productId, setIsEditorLoading, }) {
    const [selectedProductFormId, setSelectedProductFormId] = (0, element_1.useState)(null);
    (0, use_confirm_unsaved_product_changes_1.useConfirmUnsavedProductChanges)(postType);
    /**
     * Fire wp-pin-menu event once to trigger the pinning of the menu.
     * That can be necessary since wpwrap's height wasn't being recalculated after the skeleton
     * is switched to the real content, which is usually larger
     */
    (0, element_1.useEffect)(() => {
        const wpPinMenuEvent = () => {
            document.dispatchEvent(new Event('wp-pin-menu'));
        };
        window.addEventListener('scroll', wpPinMenuEvent, { once: true });
        return () => window.removeEventListener('scroll', wpPinMenuEvent);
    }, []);
    (0, element_1.useEffect)(() => {
        // @ts-expect-error Type definitions are missing
        const { registerShortcut } = (0, data_1.dispatch)(keyboard_shortcuts_1.store);
        if (registerShortcut) {
            registerShortcut({
                name: 'core/editor/save',
                category: 'global',
                description: (0, i18n_1.__)('Save your changes.', 'fincommerce'),
                keyCombination: {
                    modifier: 'primary',
                    character: 's',
                },
            });
        }
    }, []);
    const [settingsGlobal, setSettingsGlobal] = (0, element_1.useState)(undefined);
    (0, element_1.useEffect)(() => {
        let timeoutId;
        const checkSettingsGlobal = () => {
            if (window.productBlockEditorSettings !== undefined) {
                setSettingsGlobal(window.productBlockEditorSettings);
            }
            else {
                timeoutId = setTimeout(checkSettingsGlobal, 100);
            }
        };
        checkSettingsGlobal();
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
    const settings = (0, element_1.useMemo)(() => {
        if (settingsGlobal === undefined) {
            return undefined;
        }
        const canUserCreateMedia = (0, data_1.select)('core').canUser('create', 'media', '') !== false;
        const mediaSettings = canUserCreateMedia
            ? {
                mediaUpload({ onError, ...rest }) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore No types for this exist yet.
                    (0, media_utils_1.uploadMedia)({
                        wpAllowedMimeTypes: settingsGlobal.allowedMimeTypes || undefined,
                        onError: ({ message }) => onError(message),
                        ...rest,
                    });
                },
            }
            : {};
        return {
            ...settingsGlobal,
            ...mediaSettings,
            templateLock: 'all',
        };
    }, [settingsGlobal]);
    const { editedRecord: product, hasResolved } = (0, core_data_1.useEntityRecord)('postType', postType, productId, 
    // Only perform the query when the productId is valid.
    { enabled: productId !== -1 });
    const productTemplateId = (0, element_1.useMemo)(() => product?.meta_data?.find((metaEntry) => metaEntry.key === '_product_template_id')?.value, [product?.meta_data]);
    const { productTemplate } = (0, use_product_template_1.useProductTemplate)(productTemplateId, hasResolved ? product : null);
    const { layoutTemplate } = (0, block_templates_1.useLayoutTemplate)(hasResolved ? getLayoutTemplateId(productTemplate, postType) : null);
    const [blocks, onInput, onChange] = (0, core_data_1.useEntityBlockEditor)('postType', postType, 
    // useEntityBlockEditor will not try to fetch the product if productId is falsy.
    { id: productId !== -1 ? productId : 0 });
    // Pull the product templates from the store.
    const productForms = (0, data_1.useSelect)((sel) => {
        return (sel('core').getEntityRecords('postType', 'product_form', {
            per_page: -1,
        }) || []);
    }, []);
    // Set the default product form template ID.
    (0, element_1.useEffect)(() => {
        if (!productForms.length) {
            return;
        }
        setSelectedProductFormId(productForms[0].id);
    }, [productForms]);
    const isEditorLoading = !settings ||
        !layoutTemplate ||
        // variations don't have a product template
        (postType !== 'product_variation' && !productTemplate) ||
        productId === -1 ||
        !hasResolved;
    const productFormTemplate = (0, element_1.useMemo)(function pickAndParseTheProductFormTemplate() {
        if (!(0, is_product_form_template_system_enabled_1.default)() ||
            !selectedProductFormId) {
            return undefined;
        }
        const productFormPost = productForms.find((form) => form.id === selectedProductFormId);
        if (productFormPost) {
            return (0, blocks_1.parse)(productFormPost.content.raw);
        }
        return undefined;
    }, [productForms, selectedProductFormId]);
    (0, element_1.useLayoutEffect)(function setupEditor() {
        if (isEditorLoading) {
            return;
        }
        const blockInstances = (0, blocks_1.synchronizeBlocksWithTemplate)([], 
        // @ts-expect-error Type definitions are missing
        layoutTemplate.blockTemplates);
        /*
         * If the product form template is not available, use the block instances.
         * ToDo: Remove this fallback once the product form template is stable/available.
         */
        const editorTemplate = blockInstances ?? productFormTemplate;
        onChange(editorTemplate, {});
        // @ts-expect-error Type definitions are missing
        (0, data_1.dispatch)('core/editor').updateEditorSettings({
            ...settings,
            productTemplate,
        });
        // We don't need to include onChange in the dependencies, since we get new
        // instances of it on every render, which would cause an infinite loop.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isEditorLoading,
        layoutTemplate,
        settings,
        productTemplate,
        productFormTemplate,
        productId,
    ]);
    (0, element_1.useEffect)(() => {
        setIsEditorLoading(isEditorLoading);
    }, [isEditorLoading, setIsEditorLoading]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { editEntityRecord } = (0, data_1.useDispatch)('core');
    (0, element_1.useEffect)(function maybeSetProductTemplateFromURL() {
        const query = (0, navigation_1.getQuery)();
        const isAddProduct = (0, navigation_1.getPath)().endsWith('add-product');
        if (isAddProduct && query.template) {
            const productTemplates = window.productBlockEditorSettings?.productTemplates ?? [];
            const selectedProductTemplate = productTemplates.find((t) => t.id === query.template);
            if (selectedProductTemplate) {
                editEntityRecord('postType', postType, productId, {
                    ...selectedProductTemplate.productData,
                    meta_data: [
                        ...(selectedProductTemplate.productData.meta_data ??
                            []),
                        {
                            key: '_product_template_id',
                            value: selectedProductTemplate.id,
                        },
                    ],
                });
            }
        }
    }, []);
    // Check if the Modal editor is open from the store.
    const isModalEditorOpen = (0, data_1.useSelect)((selectCore) => {
        return selectCore(product_editor_ui_1.wooProductEditorUiStore).isModalEditorOpen();
    }, []);
    if (isEditorLoading) {
        return ((0, element_1.createElement)("div", { className: "fincommerce-product-block-editor" },
            (0, element_1.createElement)(loading_state_1.LoadingState, null)));
    }
    if (isModalEditorOpen) {
        return ((0, element_1.createElement)(element_1.Suspense, { fallback: null },
            (0, element_1.createElement)(ModalEditor, { onClose: (0, data_1.dispatch)(product_editor_ui_1.wooProductEditorUiStore).closeModalEditor, title: (0, i18n_1.__)('Edit description', 'fincommerce'), name: product.name === 'AUTO-DRAFT'
                    ? (0, i18n_1.__)('(no product name)', 'fincommerce')
                    : product.name })));
    }
    return ((0, element_1.createElement)("div", { className: "fincommerce-product-block-editor" },
        (0, element_1.createElement)(block_editor_1.BlockContextProvider, { value: context },
            (0, element_1.createElement)(block_editor_1.BlockEditorProvider, { value: blocks, onInput: onInput, onChange: onChange, settings: settings, useSubRegistry: false },
                (0, element_1.createElement)(block_editor_1.BlockEditorKeyboardShortcuts.Register, null),
                (0, element_1.createElement)(block_editor_1.BlockTools, null,
                    (0, element_1.createElement)(block_editor_1.ObserveTyping, null,
                        (0, element_1.createElement)(block_editor_1.BlockList, { className: "fincommerce-product-block-editor__block-list" }))),
                (0, element_1.createElement)(post_type_context_1.PostTypeContext.Provider, { value: context.postType },
                    (0, element_1.createElement)(element_1.Suspense, { fallback: null },
                        (0, element_1.createElement)(PluginArea, { scope: "fincommerce-product-block-editor" })))))));
}
