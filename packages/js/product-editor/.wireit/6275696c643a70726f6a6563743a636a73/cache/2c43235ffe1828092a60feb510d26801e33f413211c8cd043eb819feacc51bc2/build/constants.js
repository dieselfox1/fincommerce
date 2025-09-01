"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_VARIATION_PER_PAGE_OPTIONS = exports.DEFAULT_VARIATION_PER_PAGE_OPTION = exports.DEFAULT_PER_PAGE_OPTION = exports.HEADER_PINNED_ITEMS_SCOPE = exports.TRACKS_SOURCE = exports.PRODUCT_SCHEDULED_SALE_SLUG = exports.PRODUCT_DETAILS_SLUG = exports.VARIANT_SHIPPING_SECTION_DIMENSIONS_ID = exports.VARIANT_SHIPPING_SECTION_BASIC_ID = exports.VARIANT_INVENTORY_SECTION_ADVANCED_ID = exports.VARIANT_INVENTORY_SECTION_ID = exports.VARIANT_PRICING_SECTION_TAXES_ADVANCED_ID = exports.VARIANT_PRICING_SECTION_TAXES_ID = exports.VARIANT_PRICING_SECTION_BASIC_ID = exports.SHIPPING_SECTION_DIMENSIONS_ID = exports.SHIPPING_SECTION_BASIC_ID = exports.INVENTORY_SECTION_ADVANCED_ID = exports.INVENTORY_SECTION_ID = exports.PRICING_SECTION_TAXES_ADVANCED_ID = exports.PRICING_SECTION_TAXES_ID = exports.PRICING_SECTION_BASIC_ID = exports.ATTRIBUTES_SECTION_ID = exports.IMAGES_SECTION_ID = exports.DETAILS_SECTION_ID = exports.VARIANT_TAB_SHIPPING_ID = exports.VARIANT_TAB_INVENTORY_ID = exports.VARIANT_TAB_PRICING_ID = exports.VARIANT_TAB_GENERAL_ID = exports.TAB_OPTIONS_ID = exports.TAB_SHIPPING_ID = exports.TAB_INVENTORY_ID = exports.TAB_PRICING_ID = exports.TAB_GENERAL_ID = exports.STANDARD_RATE_TAX_CLASS_SLUG = exports.PRODUCT_VARIATION_TITLE_LIMIT = exports.UNCATEGORIZED_CATEGORY_SLUG = exports.ADD_NEW_SHIPPING_CLASS_OPTION_VALUE = exports.ONLY_ONE_DECIMAL_SEPARATOR = exports.NUMBERS_AND_DECIMAL_SEPARATOR = exports.NUMBERS_AND_ALLOWED_CHARS = exports.SHOW_PREPUBLISH_CHECKS_ENABLED_OPTION_NAME = exports.SINGLE_VARIATION_NOTICE_DISMISSED_OPTION = exports.PRODUCT_EDITOR_FEEDBACK_CES_ACTION = exports.PRODUCT_EDITOR_SHOW_FEEDBACK_BAR_OPTION_NAME = void 0;
exports.PRODUCT_EDITOR_SHOW_FEEDBACK_BAR_OPTION_NAME = 'fincommerce_product_editor_show_feedback_bar';
exports.PRODUCT_EDITOR_FEEDBACK_CES_ACTION = 'product_editor';
exports.SINGLE_VARIATION_NOTICE_DISMISSED_OPTION = 'fincommerce_single_variation_notice_dismissed';
exports.SHOW_PREPUBLISH_CHECKS_ENABLED_OPTION_NAME = 'fincommerce_show_prepublish_checks_enabled';
exports.NUMBERS_AND_ALLOWED_CHARS = '[^-0-9%s1%s2]';
exports.NUMBERS_AND_DECIMAL_SEPARATOR = '[^-\\d\\%s]+';
exports.ONLY_ONE_DECIMAL_SEPARATOR = '[%s](?=%s*[%s])';
// This should never be a real slug value of any existing shipping class
exports.ADD_NEW_SHIPPING_CLASS_OPTION_VALUE = '__ADD_NEW_SHIPPING_CLASS_OPTION__';
exports.UNCATEGORIZED_CATEGORY_SLUG = 'uncategorized';
exports.PRODUCT_VARIATION_TITLE_LIMIT = 32;
exports.STANDARD_RATE_TAX_CLASS_SLUG = 'standard';
// Fill constants
exports.TAB_GENERAL_ID = 'tab/general';
exports.TAB_PRICING_ID = 'tab/pricing';
exports.TAB_INVENTORY_ID = 'tab/inventory';
exports.TAB_SHIPPING_ID = 'tab/shipping';
exports.TAB_OPTIONS_ID = 'tab/options';
exports.VARIANT_TAB_GENERAL_ID = `variant/${exports.TAB_GENERAL_ID}`;
exports.VARIANT_TAB_PRICING_ID = `variant/${exports.TAB_PRICING_ID}`;
exports.VARIANT_TAB_INVENTORY_ID = `variant/${exports.TAB_INVENTORY_ID}`;
exports.VARIANT_TAB_SHIPPING_ID = `variant/${exports.TAB_SHIPPING_ID}`;
exports.DETAILS_SECTION_ID = `${exports.TAB_GENERAL_ID}/details`;
exports.IMAGES_SECTION_ID = `${exports.TAB_GENERAL_ID}/images`;
exports.ATTRIBUTES_SECTION_ID = `${exports.TAB_GENERAL_ID}/attributes`;
exports.PRICING_SECTION_BASIC_ID = `${exports.TAB_PRICING_ID}/basic`;
exports.PRICING_SECTION_TAXES_ID = `${exports.TAB_PRICING_ID}/taxes`;
exports.PRICING_SECTION_TAXES_ADVANCED_ID = `${exports.TAB_PRICING_ID}/taxes/advanced`;
exports.INVENTORY_SECTION_ID = `${exports.TAB_INVENTORY_ID}/basic`;
exports.INVENTORY_SECTION_ADVANCED_ID = `${exports.TAB_INVENTORY_ID}/advanced`;
exports.SHIPPING_SECTION_BASIC_ID = `${exports.TAB_SHIPPING_ID}/basic`;
exports.SHIPPING_SECTION_DIMENSIONS_ID = `${exports.TAB_SHIPPING_ID}/dimensions`;
exports.VARIANT_PRICING_SECTION_BASIC_ID = `variant/${exports.PRICING_SECTION_BASIC_ID}`;
exports.VARIANT_PRICING_SECTION_TAXES_ID = `variant/${exports.PRICING_SECTION_TAXES_ID}`;
exports.VARIANT_PRICING_SECTION_TAXES_ADVANCED_ID = `variant/${exports.PRICING_SECTION_TAXES_ADVANCED_ID}`;
exports.VARIANT_INVENTORY_SECTION_ID = `variant/${exports.INVENTORY_SECTION_ID}`;
exports.VARIANT_INVENTORY_SECTION_ADVANCED_ID = `variant/${exports.INVENTORY_SECTION_ADVANCED_ID}`;
exports.VARIANT_SHIPPING_SECTION_BASIC_ID = `variant/${exports.SHIPPING_SECTION_BASIC_ID}`;
exports.VARIANT_SHIPPING_SECTION_DIMENSIONS_ID = `variant/${exports.SHIPPING_SECTION_DIMENSIONS_ID}`;
exports.PRODUCT_DETAILS_SLUG = 'product-details';
exports.PRODUCT_SCHEDULED_SALE_SLUG = 'product-scheduled-sale';
exports.TRACKS_SOURCE = 'product-block-editor-v1';
exports.HEADER_PINNED_ITEMS_SCOPE = 'fincommerce/product-editor';
/**
 * Since the pagination component does not exposes the way of
 * changing the per page options which are [25, 50, 75, 100]
 * the default per page option will be the min in the list to
 * keep compatibility.
 *
 * @see https://github.com/dieselfox1/fincommerce/blob/trunk/packages/js/components/src/pagination/index.js#L12
 */
exports.DEFAULT_PER_PAGE_OPTION = 25;
exports.DEFAULT_VARIATION_PER_PAGE_OPTION = 5;
exports.DEFAULT_VARIATION_PER_PAGE_OPTIONS = [5, 10, 25];
