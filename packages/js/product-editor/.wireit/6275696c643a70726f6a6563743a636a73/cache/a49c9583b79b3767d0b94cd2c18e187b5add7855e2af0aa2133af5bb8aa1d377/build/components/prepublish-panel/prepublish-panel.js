"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrepublishPanel = PrepublishPanel;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const tracks_1 = require("@fincommerce/tracks");
const core_data_1 = require("@wordpress/core-data");
const icons_1 = require("@wordpress/icons");
const clsx_1 = __importDefault(require("clsx"));
const date_1 = require("@wordpress/date");
/**
 * Internal dependencies
 */
const publish_button_1 = require("../header/publish-button");
const product_editor_ui_1 = require("../../store/product-editor-ui");
const constants_1 = require("../../constants");
const visibility_section_1 = require("./visibility-section");
const schedule_section_1 = require("./schedule-section");
const post_publish_1 = require("./post-publish");
function PrepublishPanel({ productType = 'product', title = (0, i18n_1.__)('Are you ready to publish this product?', 'fincommerce'), description = (0, i18n_1.__)('Double-check your settings before sharing this product with customers.', 'fincommerce'), }) {
    const [editedDate] = (0, core_data_1.useEntityProp)('postType', productType, 'date_created_gmt');
    const [productStatus, , prevStatus] = (0, core_data_1.useEntityProp)('postType', productType, 'status');
    const { closePrepublishPanel } = (0, data_1.useDispatch)(product_editor_ui_1.wooProductEditorUiStore);
    const isPublishedOrScheduled = productType === 'product' && prevStatus !== 'future'
        ? productStatus === 'publish'
        : true;
    if ((0, date_1.isInTheFuture)(editedDate)) {
        title = (0, i18n_1.__)('Are you ready to schedule this product?', 'fincommerce');
        description = (0, i18n_1.__)('Your product will be published at the specified date and time.', 'fincommerce');
    }
    const panelRef = (0, element_1.useRef)(null);
    function handleClickOutside(event) {
        if (panelRef.current &&
            !panelRef.current.contains(event.target)) {
            closePrepublishPanel();
        }
    }
    (0, element_1.useEffect)(() => {
        if (!isPublishedOrScheduled) {
            return;
        }
        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [isPublishedOrScheduled]);
    function getHeaderActions() {
        if (isPublishedOrScheduled) {
            return ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-publish-panel-close", icon: icons_1.closeSmall, label: (0, i18n_1.__)('Close panel', 'fincommerce'), onClick: () => {
                    (0, tracks_1.recordEvent)('product_prepublish_panel', {
                        source: constants_1.TRACKS_SOURCE,
                        action: 'close',
                    });
                    closePrepublishPanel();
                } }));
        }
        return ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(publish_button_1.PublishButton, { productType: productType }),
            (0, element_1.createElement)(components_1.Button, { variant: 'secondary', onClick: () => {
                    (0, tracks_1.recordEvent)('product_prepublish_panel', {
                        source: constants_1.TRACKS_SOURCE,
                        action: 'cancel',
                    });
                    closePrepublishPanel();
                } }, (0, i18n_1.__)('Cancel', 'fincommerce'))));
    }
    function getPanelTitle() {
        if (isPublishedOrScheduled) {
            return (0, element_1.createElement)(post_publish_1.PostPublishTitle, { productType: productType });
        }
        return ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)("h4", null, title),
            (0, element_1.createElement)("span", null, description)));
    }
    function getPanelSections() {
        if (isPublishedOrScheduled) {
            return (0, element_1.createElement)(post_publish_1.PostPublishSection, { postType: productType });
        }
        return ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(visibility_section_1.VisibilitySection, { productType: productType }),
            (0, element_1.createElement)(schedule_section_1.ScheduleSection, { postType: productType })));
    }
    return ((0, element_1.createElement)("div", { ref: panelRef, className: (0, clsx_1.default)('fincommerce-product-publish-panel', {
            'is-published': isPublishedOrScheduled,
        }) },
        (0, element_1.createElement)("div", { className: "fincommerce-product-publish-panel__header" }, getHeaderActions()),
        (0, element_1.createElement)("div", { className: "fincommerce-product-publish-panel__title" }, getPanelTitle()),
        (0, element_1.createElement)("div", { className: "fincommerce-product-publish-panel__content" }, getPanelSections()),
        (0, element_1.createElement)("div", { className: "fincommerce-product-publish-panel__footer" })));
}
