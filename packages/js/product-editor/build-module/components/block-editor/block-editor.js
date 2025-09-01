/**
 * External dependencies
 */
import { parse, synchronizeBlocksWithTemplate } from '@wordpress/blocks';
import { createElement, useMemo, useLayoutEffect, useEffect, useState, lazy, Suspense, } from '@wordpress/element';
import { dispatch, select, useDispatch, useSelect } from '@wordpress/data';
import { uploadMedia } from '@wordpress/media-utils';
import { __ } from '@wordpress/i18n';
import { useLayoutTemplate } from '@fincommerce/block-templates';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { getPath, getQuery } from '@fincommerce/navigation';
import { 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
BlockContextProvider, BlockEditorKeyboardShortcuts, BlockEditorProvider, BlockList, 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
BlockTools, ObserveTyping, } from '@wordpress/block-editor';
// It doesn't seem to notice the External dependency block when @ts-ignore is added.
// eslint-disable-next-line @fincommerce/dependency-group
import { 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore store should be included.
useEntityBlockEditor, 
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore store should be included.
useEntityRecord, } from '@wordpress/core-data';
/**
 * Internal dependencies
 */
import { useConfirmUnsavedProductChanges } from '../../hooks/use-confirm-unsaved-product-changes';
import { useProductTemplate } from '../../hooks/use-product-template';
import { PostTypeContext } from '../../contexts/post-type-context';
import { wooProductEditorUiStore } from '../../store/product-editor-ui';
import { LoadingState } from './loading-state';
import isProductFormTemplateSystemEnabled from '../../utils/is-product-form-template-system-enabled';
const PluginArea = lazy(() => import('@wordpress/plugins').then((module) => ({
    default: module.PluginArea,
})));
const ModalEditor = lazy(() => import('../modal-editor').then((module) => ({
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
export function BlockEditor({ context, postType, productId, setIsEditorLoading, }) {
    const [selectedProductFormId, setSelectedProductFormId] = useState(null);
    useConfirmUnsavedProductChanges(postType);
    /**
     * Fire wp-pin-menu event once to trigger the pinning of the menu.
     * That can be necessary since wpwrap's height wasn't being recalculated after the skeleton
     * is switched to the real content, which is usually larger
     */
    useEffect(() => {
        const wpPinMenuEvent = () => {
            document.dispatchEvent(new Event('wp-pin-menu'));
        };
        window.addEventListener('scroll', wpPinMenuEvent, { once: true });
        return () => window.removeEventListener('scroll', wpPinMenuEvent);
    }, []);
    useEffect(() => {
        // @ts-expect-error Type definitions are missing
        const { registerShortcut } = dispatch(keyboardShortcutsStore);
        if (registerShortcut) {
            registerShortcut({
                name: 'core/editor/save',
                category: 'global',
                description: __('Save your changes.', 'fincommerce'),
                keyCombination: {
                    modifier: 'primary',
                    character: 's',
                },
            });
        }
    }, []);
    const [settingsGlobal, setSettingsGlobal] = useState(undefined);
    useEffect(() => {
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
    const settings = useMemo(() => {
        if (settingsGlobal === undefined) {
            return undefined;
        }
        const canUserCreateMedia = select('core').canUser('create', 'media', '') !== false;
        const mediaSettings = canUserCreateMedia
            ? {
                mediaUpload({ onError, ...rest }) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore No types for this exist yet.
                    uploadMedia({
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
    const { editedRecord: product, hasResolved } = useEntityRecord('postType', postType, productId, 
    // Only perform the query when the productId is valid.
    { enabled: productId !== -1 });
    const productTemplateId = useMemo(() => product?.meta_data?.find((metaEntry) => metaEntry.key === '_product_template_id')?.value, [product?.meta_data]);
    const { productTemplate } = useProductTemplate(productTemplateId, hasResolved ? product : null);
    const { layoutTemplate } = useLayoutTemplate(hasResolved ? getLayoutTemplateId(productTemplate, postType) : null);
    const [blocks, onInput, onChange] = useEntityBlockEditor('postType', postType, 
    // useEntityBlockEditor will not try to fetch the product if productId is falsy.
    { id: productId !== -1 ? productId : 0 });
    // Pull the product templates from the store.
    const productForms = useSelect((sel) => {
        return (sel('core').getEntityRecords('postType', 'product_form', {
            per_page: -1,
        }) || []);
    }, []);
    // Set the default product form template ID.
    useEffect(() => {
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
    const productFormTemplate = useMemo(function pickAndParseTheProductFormTemplate() {
        if (!isProductFormTemplateSystemEnabled() ||
            !selectedProductFormId) {
            return undefined;
        }
        const productFormPost = productForms.find((form) => form.id === selectedProductFormId);
        if (productFormPost) {
            return parse(productFormPost.content.raw);
        }
        return undefined;
    }, [productForms, selectedProductFormId]);
    useLayoutEffect(function setupEditor() {
        if (isEditorLoading) {
            return;
        }
        const blockInstances = synchronizeBlocksWithTemplate([], 
        // @ts-expect-error Type definitions are missing
        layoutTemplate.blockTemplates);
        /*
         * If the product form template is not available, use the block instances.
         * ToDo: Remove this fallback once the product form template is stable/available.
         */
        const editorTemplate = blockInstances ?? productFormTemplate;
        onChange(editorTemplate, {});
        // @ts-expect-error Type definitions are missing
        dispatch('core/editor').updateEditorSettings({
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
    useEffect(() => {
        setIsEditorLoading(isEditorLoading);
    }, [isEditorLoading, setIsEditorLoading]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { editEntityRecord } = useDispatch('core');
    useEffect(function maybeSetProductTemplateFromURL() {
        const query = getQuery();
        const isAddProduct = getPath().endsWith('add-product');
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
    const isModalEditorOpen = useSelect((selectCore) => {
        return selectCore(wooProductEditorUiStore).isModalEditorOpen();
    }, []);
    if (isEditorLoading) {
        return (createElement("div", { className: "fincommerce-product-block-editor" },
            createElement(LoadingState, null)));
    }
    if (isModalEditorOpen) {
        return (createElement(Suspense, { fallback: null },
            createElement(ModalEditor, { onClose: dispatch(wooProductEditorUiStore).closeModalEditor, title: __('Edit description', 'fincommerce'), name: product.name === 'AUTO-DRAFT'
                    ? __('(no product name)', 'fincommerce')
                    : product.name })));
    }
    return (createElement("div", { className: "fincommerce-product-block-editor" },
        createElement(BlockContextProvider, { value: context },
            createElement(BlockEditorProvider, { value: blocks, onInput: onInput, onChange: onChange, settings: settings, useSubRegistry: false },
                createElement(BlockEditorKeyboardShortcuts.Register, null),
                createElement(BlockTools, null,
                    createElement(ObserveTyping, null,
                        createElement(BlockList, { className: "fincommerce-product-block-editor__block-list" }))),
                createElement(PostTypeContext.Provider, { value: context.postType },
                    createElement(Suspense, { fallback: null },
                        createElement(PluginArea, { scope: "fincommerce-product-block-editor" })))))));
}
