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
exports.Header = Header;
/**
 * External dependencies
 */
const admin_layout_1 = require("@fincommerce/admin-layout");
const core_data_1 = require("@wordpress/core-data");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const icons_1 = require("@wordpress/icons");
const navigation_1 = require("@fincommerce/navigation");
const tracks_1 = require("@fincommerce/tracks");
const clsx_1 = __importDefault(require("clsx"));
const components_2 = require("@fincommerce/components");
const pinned_items_1 = __importDefault(require("@wordpress/interface/build-module/components/pinned-items"));
/**
 * Internal dependencies
 */
const editor_loading_context_1 = require("../../contexts/editor-loading-context");
const utils_1 = require("../../utils");
const more_menu_1 = require("./more-menu");
const preview_button_1 = require("./preview-button");
const save_draft_button_1 = require("./save-draft-button");
const loading_state_1 = require("./loading-state");
const tabs_1 = require("../tabs");
const constants_1 = require("../../constants");
const use_show_prepublish_checks_1 = require("../../hooks/use-show-prepublish-checks");
const PublishButton = (0, element_1.lazy)(() => Promise.resolve().then(() => __importStar(require('./publish-button'))).then((module) => ({
    default: module.PublishButton,
})));
const RETURN_TO_MAIN_PRODUCT = (0, i18n_1.__)('Return to the main product', 'fincommerce');
function Header({ onTabSelect, productType = 'product', selectedTab, }) {
    const isEditorLoading = (0, element_1.useContext)(editor_loading_context_1.EditorLoadingContext);
    const productId = (0, core_data_1.useEntityId)('postType', productType);
    const { editedRecord: product } = (0, core_data_1.useEntityRecord)('postType', productType, productId, { enabled: productId !== -1 });
    const lastPersistedProduct = (0, data_1.useSelect)((select) => {
        const { getEntityRecord } = select('core');
        return productId !== -1
            ? // @ts-expect-error getEntityRecord is not typed correctly.
                getEntityRecord('postType', productType, productId)
            : null;
    }, [productType, productId]);
    const editedProductName = product?.name;
    const catalogVisibility = product?.catalog_visibility;
    const productStatus = product?.status;
    const { showPrepublishChecks } = (0, use_show_prepublish_checks_1.useShowPrepublishChecks)();
    const sidebarWidth = (0, admin_layout_1.useAdminSidebarWidth)();
    (0, element_1.useEffect)(() => {
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
        return (0, element_1.createElement)(loading_state_1.LoadingState, null);
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
            tags.push((0, element_1.createElement)(components_2.Tag, { key: 'draft-tag', label: (0, i18n_1.__)('Draft', 'fincommerce') }));
        }
        if (productStatus === 'future') {
            tags.push((0, element_1.createElement)(components_2.Tag, { key: 'scheduled-tag', label: (0, i18n_1.__)('Scheduled', 'fincommerce') }));
        }
        if ((productStatus !== 'future' && catalogVisibility === 'hidden') ||
            (isVariation && productStatus === 'private')) {
            tags.push((0, element_1.createElement)(components_2.Tag, { key: 'hidden-tag', label: (0, i18n_1.__)('Hidden', 'fincommerce') }));
        }
        return tags;
    }
    return ((0, element_1.createElement)("div", { className: "fincommerce-product-header", role: "region", "aria-label": (0, i18n_1.__)('Product Editor top bar.', 'fincommerce'), tabIndex: -1 },
        (0, element_1.createElement)("div", { className: "fincommerce-product-header__inner" },
            isVariation ? ((0, element_1.createElement)("div", { className: "fincommerce-product-header__back" },
                (0, element_1.createElement)(components_1.Tooltip
                // @ts-expect-error className is missing in TS, should remove this when it is included.
                , { 
                    // @ts-expect-error className is missing in TS, should remove this when it is included.
                    className: "fincommerce-product-header__back-tooltip", text: RETURN_TO_MAIN_PRODUCT },
                    (0, element_1.createElement)("div", { className: "fincommerce-product-header__back-tooltip-wrapper" },
                        (0, element_1.createElement)(components_1.Button, { icon: icons_1.chevronLeft, isTertiary: true, onClick: () => {
                                (0, tracks_1.recordEvent)('product_variation_back_to_main_product', {
                                    source: constants_1.TRACKS_SOURCE,
                                });
                                const url = (0, navigation_1.getNewPath)({ tab: 'variations' }, `/product/${lastPersistedProduct?.parent_id}`);
                                (0, navigation_1.navigateTo)({ url });
                            } }, (0, i18n_1.__)('Main product', 'fincommerce')))))) : ((0, element_1.createElement)("div", null)),
            (0, element_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-product-header-title-bar', {
                    'is-variation': isVariation,
                }) },
                (0, element_1.createElement)("div", { className: "fincommerce-product-header-title-bar__image" }, isHeaderImageVisible ? ((0, element_1.createElement)("img", { alt: getImagePropertyValue(selectedImage, 'alt'), src: getImagePropertyValue(selectedImage, 'src'), className: "fincommerce-product-header-title-bar__product-image" })) : ((0, element_1.createElement)(icons_1.Icon, { icon: isVariation ? icons_1.group : icons_1.box }))),
                (0, element_1.createElement)("h1", { className: "fincommerce-product-header__title" },
                    isVariation ? ((0, element_1.createElement)(element_1.Fragment, null,
                        lastPersistedProduct?.name,
                        (0, element_1.createElement)("span", { className: "fincommerce-product-header__variable-product-id" },
                            "# ",
                            lastPersistedProduct?.id))) : ((0, utils_1.getHeaderTitle)(editedProductName, 
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore - Arg is not typed correctly.
                    lastPersistedProduct?.name)),
                    (0, element_1.createElement)("div", { className: "fincommerce-product-header__visibility-tags" }, getVisibilityTags()))),
            (0, element_1.createElement)("div", { className: "fincommerce-product-header__actions" },
                !isVariation && ((0, element_1.createElement)(save_draft_button_1.SaveDraftButton, { productType: productType, visibleTab: selectedTab, 
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore - Prop is not typed correctly.
                    productStatus: lastPersistedProduct?.status })),
                (0, element_1.createElement)(preview_button_1.PreviewButton, { productType: productType, visibleTab: selectedTab, 
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore - Prop is not typed correctly.
                    productStatus: lastPersistedProduct?.status }),
                (0, element_1.createElement)(element_1.Suspense, { fallback: null },
                    (0, element_1.createElement)(PublishButton, { productType: productType, isPrePublishPanelVisible: showPrepublishChecks, isMenuButton: true, visibleTab: selectedTab })),
                (0, element_1.createElement)(admin_layout_1.WooHeaderItem.Slot, { name: "product" }),
                (0, element_1.createElement)(pinned_items_1.default.Slot, { scope: constants_1.HEADER_PINNED_ITEMS_SCOPE }),
                (0, element_1.createElement)(more_menu_1.MoreMenu, null))),
        (0, element_1.createElement)(tabs_1.Tabs, { selected: selectedTab, onChange: onTabSelect })));
}
