"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCustomerEffortScoreExitPageListener = exports.addCustomerEffortScoreExitPageListener = exports.removeExitPage = exports.addExitPage = exports.getExitPageData = void 0;
exports.triggerExitPageCesSurvey = triggerExitPageCesSurvey;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@fincommerce/data");
const data_2 = require("@wordpress/data");
const navigation_1 = require("@fincommerce/navigation");
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
const store_1 = __importDefault(require("../store"));
const CUSTOMER_EFFORT_SCORE_EXIT_PAGE_KEY = 'customer-effort-score-exit-page';
/**
 * Gets the list of exited pages from Localstorage.
 */
const getExitPageData = () => {
    if (!window.localStorage) {
        return [];
    }
    const items = window.localStorage.getItem(CUSTOMER_EFFORT_SCORE_EXIT_PAGE_KEY);
    const parsedJSONItems = items ? JSON.parse(items) : [];
    const arrayItems = Array.isArray(parsedJSONItems) ? parsedJSONItems : [];
    return arrayItems;
};
exports.getExitPageData = getExitPageData;
/**
 * Returns the value of whether tracking is allowed or not.
 *
 * @return boolean
 */
const isTrackingAllowed = async () => {
    const trackingOption = await (0, data_2.resolveSelect)(data_1.optionsStore).getOption(constants_1.ALLOW_TRACKING_OPTION_NAME);
    return trackingOption === 'yes';
};
/**
 * Adds the page to the exit page list in Localstorage.
 *
 * @param {string} pageId of page exited early.
 */
const addExitPage = async (pageId) => {
    const allowTracking = await isTrackingAllowed();
    if (!(window.localStorage && allowTracking)) {
        return;
    }
    let items = (0, exports.getExitPageData)();
    if (!items.find((pageExitedId) => pageExitedId === pageId)) {
        items.push(pageId);
    }
    items = items.slice(-10); // Upper limit.
    window.localStorage.setItem(CUSTOMER_EFFORT_SCORE_EXIT_PAGE_KEY, JSON.stringify(items));
};
exports.addExitPage = addExitPage;
/**
 * Removes the passed in page id from the list in Localstorage.
 *
 * @param {string} pageId of page to be removed.
 */
const removeExitPage = (pageId) => {
    if (!window.localStorage) {
        return;
    }
    let items = (0, exports.getExitPageData)();
    items = items.filter((pageExitedId) => pageExitedId !== pageId);
    items = items.slice(-10); // Upper limit.
    window.localStorage.setItem(CUSTOMER_EFFORT_SCORE_EXIT_PAGE_KEY, JSON.stringify(items));
};
exports.removeExitPage = removeExitPage;
const eventListeners = {};
/**
 * Adds unload event listener to add pageId to exit page list incase there were unsaved changes.
 *
 * @param {string}   pageId            the page id of the page being exited early.
 * @param {Function} hasUnsavedChanges callback to check if the page had unsaved changes.
 */
const addCustomerEffortScoreExitPageListener = (pageId, hasUnsavedChanges) => {
    // Pre-fetch the tracking option so that it is available before the unload event.
    isTrackingAllowed();
    eventListeners[pageId] = () => {
        if (hasUnsavedChanges()) {
            (0, exports.addExitPage)(pageId);
        }
    };
    window.addEventListener('unload', eventListeners[pageId]);
};
exports.addCustomerEffortScoreExitPageListener = addCustomerEffortScoreExitPageListener;
/**
 * Removes the unload exit page listener.
 *
 * @param {string} pageId the page id to remove the listener from.
 */
const removeCustomerEffortScoreExitPageListener = (pageId) => {
    if (eventListeners[pageId]) {
        window.removeEventListener('unload', eventListeners[pageId], {
            capture: true,
        });
    }
};
exports.removeCustomerEffortScoreExitPageListener = removeCustomerEffortScoreExitPageListener;
/**
 * Returns the exit page copy of the passed in pageId.
 *
 * @param {string} pageId page id.
 */
function getExitPageCESCopy(pageId) {
    switch (pageId) {
        case 'product_edit_view':
        case 'editing_new_product':
            return {
                action: pageId === 'editing_new_product' ? 'new_product' : pageId,
                noticeLabel: (0, i18n_1.__)('How is your experience with editing products?', 'fincommerce'),
                title: (0, i18n_1.__)("How's your experience with editing products?", 'fincommerce'),
                description: (0, i18n_1.__)('We noticed you started editing a product, then left. How was it? Your feedback will help create a better experience for thousands of merchants like you.', 'fincommerce'),
                firstQuestion: (0, i18n_1.__)('The product editing screen is easy to use', 'fincommerce'),
                secondQuestion: (0, i18n_1.__)("The product editing screen's functionality meets my needs", 'fincommerce'),
            };
        case 'product_add_view':
        case 'new_product':
            return {
                action: pageId,
                noticeLabel: (0, i18n_1.__)('How is your experience with creating products?', 'fincommerce'),
                title: (0, i18n_1.__)('How is your experience with creating products?', 'fincommerce'),
                description: (0, i18n_1.__)('We noticed you started creating a product, then left. How was it? Your feedback will help create a better experience for thousands of merchants like you.', 'fincommerce'),
                firstQuestion: (0, i18n_1.__)('The product creation screen is easy to use', 'fincommerce'),
                secondQuestion: (0, i18n_1.__)("The product creation screen's functionality meets my needs", 'fincommerce'),
            };
        case 'settings_change':
            return {
                action: pageId,
                icon: '⚙️',
                noticeLabel: (0, i18n_1.__)('Did you find the right setting?', 'fincommerce'),
                title: (0, i18n_1.__)('How’s your experience with settings?', 'fincommerce'),
                description: (0, i18n_1.__)('We noticed you started changing store settings, then left. How was it? Your feedback will help create a better experience for thousands of merchants like you.', 'fincommerce'),
                firstQuestion: (0, i18n_1.__)('The settings screen is easy to use', 'fincommerce'),
                secondQuestion: (0, i18n_1.__)("The settings screen's functionality meets my needs", 'fincommerce'),
            };
        case 'shop_order_update':
            return {
                action: pageId,
                icon: '📦',
                noticeLabel: (0, i18n_1.__)('How easy or difficult was it to update this order?', 'fincommerce'),
                title: (0, i18n_1.__)("How's your experience with orders?", 'fincommerce'),
                description: (0, i18n_1.__)('We noticed you started editing an order, then left. How was it? Your feedback will help create a better experience for thousands of merchants like you.', 'fincommerce'),
                firstQuestion: (0, i18n_1.__)('The order editing screen is easy to use', 'fincommerce'),
                secondQuestion: (0, i18n_1.__)("The order details screen's functionality meets my needs", 'fincommerce'),
            };
        case 'import_products':
            return {
                action: pageId,
                icon: '🔄',
                noticeLabel: (0, i18n_1.__)('How is your experience with importing products?', 'fincommerce'),
                title: (0, i18n_1.__)(`How's your experience with importing products?`, 'fincommerce'),
                description: (0, i18n_1.__)('We noticed you started importing products, then left. How was it? Your feedback will help create a better experience for thousands of merchants like you.', 'fincommerce'),
                firstQuestion: (0, i18n_1.__)('The product import screen is easy to use', 'fincommerce'),
                secondQuestion: (0, i18n_1.__)("The product import screen's functionality meets my needs", 'fincommerce'),
            };
        default:
            return null;
    }
}
/**
 * Stores trigger conditions for exit page actions.
 *
 * @param {string} pageId page id.
 */
function getShouldExitPageFire(pageId) {
    const conditionPageMap = {
        import_products: () => (0, navigation_1.getQuery)().page !== 'product_importer',
    };
    return conditionPageMap[pageId] ? conditionPageMap[pageId]() : true;
}
/**
 * Checks the exit page list and triggers a CES survey for the first item in the list.
 */
function triggerExitPageCesSurvey() {
    const exitPageItems = (0, exports.getExitPageData)();
    if (exitPageItems?.length) {
        if (!getShouldExitPageFire(exitPageItems[0])) {
            return;
        }
        const copy = getExitPageCESCopy(exitPageItems[0]);
        if (copy?.title?.length) {
            (0, data_2.dispatch)(store_1.default).addCesSurvey({
                ...copy,
                pageNow: window.pagenow,
                adminPage: window.adminpage,
                props: {
                    ces_location: 'outside',
                },
            });
        }
        (0, exports.removeExitPage)(exitPageItems[0]);
    }
}
