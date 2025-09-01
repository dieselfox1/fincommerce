/**
 * External dependencies
 */
import { createElement, StrictMode, Fragment, useCallback, useState, } from '@wordpress/element';
import { LayoutContextProvider, useExtendLayout, } from '@fincommerce/admin-layout';
import { navigateTo, getNewPath, getQuery } from '@fincommerce/navigation';
import { useSelect } from '@wordpress/data';
import { Popover } from '@wordpress/components';
import InterfaceSkeleton from '@wordpress/interface/build-module/components/interface-skeleton';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { EntityProvider } from '@wordpress/core-data';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { ShortcutProvider } from '@wordpress/keyboard-shortcuts';
/**
 * Internal dependencies
 */
import { Header } from '../header';
import { BlockEditor } from '../block-editor';
import { EditorLoadingContext } from '../../contexts/editor-loading-context';
import { ValidationProvider } from '../../contexts/validation-context';
import { wooProductEditorUiStore } from '../../store/product-editor-ui';
import { PrepublishPanel } from '../prepublish-panel/prepublish-panel';
export function Editor({ productId, postType = 'product' }) {
    const [isEditorLoading, setIsEditorLoading] = useState(true);
    const query = getQuery();
    const selectedTab = query.tab || null;
    const setSelectedTab = useCallback((tabId) => {
        navigateTo({ url: getNewPath({ tab: tabId }) });
    }, []);
    const updatedLayoutContext = useExtendLayout('product-block-editor');
    // Check if the prepublish sidebar is open from the store.
    const isPrepublishPanelOpen = useSelect((select) => {
        return select(wooProductEditorUiStore).isPrepublishPanelOpen();
    }, []);
    return (createElement(LayoutContextProvider, { value: updatedLayoutContext },
        createElement(StrictMode, null,
            createElement(EntityProvider, { kind: "postType", type: postType, id: productId },
                createElement(ShortcutProvider, null,
                    createElement(ValidationProvider, { postType: postType, productId: productId },
                        createElement(EditorLoadingContext.Provider, { value: isEditorLoading },
                            createElement(InterfaceSkeleton, { header: createElement(Header, { onTabSelect: setSelectedTab, productType: postType, selectedTab: selectedTab }), content: createElement(Fragment, null,
                                    createElement(BlockEditor, { postType: postType, productId: productId, context: {
                                            selectedTab,
                                            postType,
                                            postId: productId,
                                        }, setIsEditorLoading: setIsEditorLoading })), actions: isPrepublishPanelOpen && (createElement(PrepublishPanel, { productType: postType })) })),
                        createElement(Popover.Slot, null)))))));
}
