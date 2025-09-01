/**
 * External dependencies
 */
import { WooHeaderItem, useAdminSidebarWidth } from '@fincommerce/admin-layout';
import { useEntityId, useEntityRecord } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { createElement, useContext, useEffect, Fragment, lazy, Suspense, } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, Tooltip } from '@wordpress/components';
import { box, chevronLeft, group, Icon } from '@wordpress/icons';
import { getNewPath, navigateTo } from '@fincommerce/navigation';
import { recordEvent } from '@fincommerce/tracks';
import clsx from 'clsx';
import { Tag } from '@fincommerce/components';
import PinnedItems from '@wordpress/interface/build-module/components/pinned-items';
/**
 * Internal dependencies
 */
import { EditorLoadingContext } from '../../contexts/editor-loading-context';
import { getHeaderTitle } from '../../utils';
import { MoreMenu } from './more-menu';
import { PreviewButton } from './preview-button';
import { SaveDraftButton } from './save-draft-button';
import { LoadingState } from './loading-state';
import { Tabs } from '../tabs';
import { HEADER_PINNED_ITEMS_SCOPE, TRACKS_SOURCE } from '../../constants';
import { useShowPrepublishChecks } from '../../hooks/use-show-prepublish-checks';
const PublishButton = lazy(() => import('./publish-button').then((module) => ({
    default: module.PublishButton,
})));
const RETURN_TO_MAIN_PRODUCT = __('Return to the main product', 'fincommerce');
export function Header({ onTabSelect, productType = 'product', selectedTab, }) {
    const isEditorLoading = useContext(EditorLoadingContext);
    const productId = useEntityId('postType', productType);
    const { editedRecord: product } = useEntityRecord('postType', productType, productId, { enabled: productId !== -1 });
    const lastPersistedProduct = useSelect((select) => {
        const { getEntityRecord } = select('core');
        return productId !== -1
            ? // @ts-expect-error getEntityRecord is not typed correctly.
                getEntityRecord('postType', productType, productId)
            : null;
    }, [productType, productId]);
    const editedProductName = product?.name;
    const catalogVisibility = product?.catalog_visibility;
    const productStatus = product?.status;
    const { showPrepublishChecks } = useShowPrepublishChecks();
    const sidebarWidth = useAdminSidebarWidth();
    useEffect(() => {
        document
            .querySelectorAll('.interface-interface-skeleton__header')
            .forEach((el) => {
            if (el.style) {
                el.style.width =
                    'calc(100% - ' + sidebarWidth + 'px)';
                el.style.left = sidebarWidth + 'px';
            }
        });
    }, [sidebarWidth]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isVariation = lastPersistedProduct?.parent_id > 0;
    const selectedImage = isVariation ? product?.image : product?.images;
    if (isEditorLoading) {
        return createElement(LoadingState, null);
    }
    const isHeaderImageVisible = (!isVariation &&
        Array.isArray(selectedImage) &&
        selectedImage.length > 0) ||
        (isVariation && selectedImage);
    function getImagePropertyValue(image, prop) {
        if (Array.isArray(image)) {
            return image[0][prop] || '';
        }
        return image[prop] || '';
    }
    function getVisibilityTags() {
        const tags = [];
        if (productStatus === 'draft') {
            tags.push(createElement(Tag, { key: 'draft-tag', label: __('Draft', 'fincommerce') }));
        }
        if (productStatus === 'future') {
            tags.push(createElement(Tag, { key: 'scheduled-tag', label: __('Scheduled', 'fincommerce') }));
        }
        if ((productStatus !== 'future' && catalogVisibility === 'hidden') ||
            (isVariation && productStatus === 'private')) {
            tags.push(createElement(Tag, { key: 'hidden-tag', label: __('Hidden', 'fincommerce') }));
        }
        return tags;
    }
    return (createElement("div", { className: "fincommerce-product-header", role: "region", "aria-label": __('Product Editor top bar.', 'fincommerce'), tabIndex: -1 },
        createElement("div", { className: "fincommerce-product-header__inner" },
            isVariation ? (createElement("div", { className: "fincommerce-product-header__back" },
                createElement(Tooltip
                // @ts-expect-error className is missing in TS, should remove this when it is included.
                , { 
                    // @ts-expect-error className is missing in TS, should remove this when it is included.
                    className: "fincommerce-product-header__back-tooltip", text: RETURN_TO_MAIN_PRODUCT },
                    createElement("div", { className: "fincommerce-product-header__back-tooltip-wrapper" },
                        createElement(Button, { icon: chevronLeft, isTertiary: true, onClick: () => {
                                recordEvent('product_variation_back_to_main_product', {
                                    source: TRACKS_SOURCE,
                                });
                                const url = getNewPath({ tab: 'variations' }, `/product/${lastPersistedProduct?.parent_id}`);
                                navigateTo({ url });
                            } }, __('Main product', 'fincommerce')))))) : (createElement("div", null)),
            createElement("div", { className: clsx('fincommerce-product-header-title-bar', {
                    'is-variation': isVariation,
                }) },
                createElement("div", { className: "fincommerce-product-header-title-bar__image" }, isHeaderImageVisible ? (createElement("img", { alt: getImagePropertyValue(selectedImage, 'alt'), src: getImagePropertyValue(selectedImage, 'src'), className: "fincommerce-product-header-title-bar__product-image" })) : (createElement(Icon, { icon: isVariation ? group : box }))),
                createElement("h1", { className: "fincommerce-product-header__title" },
                    isVariation ? (createElement(Fragment, null,
                        lastPersistedProduct?.name,
                        createElement("span", { className: "fincommerce-product-header__variable-product-id" },
                            "# ",
                            lastPersistedProduct?.id))) : (getHeaderTitle(editedProductName, 
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore - Arg is not typed correctly.
                    lastPersistedProduct?.name)),
                    createElement("div", { className: "fincommerce-product-header__visibility-tags" }, getVisibilityTags()))),
            createElement("div", { className: "fincommerce-product-header__actions" },
                !isVariation && (createElement(SaveDraftButton, { productType: productType, visibleTab: selectedTab, 
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore - Prop is not typed correctly.
                    productStatus: lastPersistedProduct?.status })),
                createElement(PreviewButton, { productType: productType, visibleTab: selectedTab, 
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore - Prop is not typed correctly.
                    productStatus: lastPersistedProduct?.status }),
                createElement(Suspense, { fallback: null },
                    createElement(PublishButton, { productType: productType, isPrePublishPanelVisible: showPrepublishChecks, isMenuButton: true, visibleTab: selectedTab })),
                createElement(WooHeaderItem.Slot, { name: "product" }),
                createElement(PinnedItems.Slot, { scope: HEADER_PINNED_ITEMS_SCOPE }),
                createElement(MoreMenu, null))),
        createElement(Tabs, { selected: selectedTab, onChange: onTabSelect })));
}
