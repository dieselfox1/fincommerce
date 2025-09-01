"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariationActions = VariationActions;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const tracks_1 = require("@fincommerce/tracks");
const clsx_1 = __importDefault(require("clsx"));
const constants_1 = require("../../../constants");
const shipping_menu_item_1 = require("../shipping-menu-item");
const inventory_menu_item_1 = require("../inventory-menu-item");
const pricing_menu_item_1 = require("../pricing-menu-item");
const toggle_visibility_menu_item_1 = require("../toggle-visibility-menu-item");
const downloads_menu_item_1 = require("../downloads-menu-item");
const variation_quick_update_menu_item_1 = require("./variation-quick-update-menu-item");
const update_stock_menu_item_1 = require("../update-stock-menu-item");
const set_list_price_menu_item_1 = require("../set-list-price-menu-item");
const add_image_menu_item_1 = require("../add-image-menu-item");
function VariationActions({ selection, onChange, onDelete, onClose, supportsMultipleSelection = false, }) {
    const singleSelection = !supportsMultipleSelection && selection.length === 1
        ? selection[0]
        : null;
    return ((0, element_1.createElement)("div", { className: (0, clsx_1.default)({
            'components-dropdown-menu__menu': supportsMultipleSelection,
        }) },
        (0, element_1.createElement)(components_1.MenuGroup, { label: supportsMultipleSelection
                ? undefined
                : (0, i18n_1.sprintf)(
                /** Translators: Variation ID */
                (0, i18n_1.__)('Variation Id: %s', 'fincommerce'), singleSelection?.id) },
            supportsMultipleSelection ? ((0, element_1.createElement)(element_1.Fragment, null,
                (0, element_1.createElement)(update_stock_menu_item_1.UpdateStockMenuItem, { selection: selection, onChange: onChange, onClose: onClose }),
                (0, element_1.createElement)(set_list_price_menu_item_1.SetListPriceMenuItem, { selection: selection, onChange: onChange, onClose: onClose }),
                (0, element_1.createElement)(add_image_menu_item_1.AddImageMenuItem, { selection: selection, onChange: onChange, onClose: onClose }))) : ((0, element_1.createElement)(components_1.MenuItem, { rel: "noreferrer", onClick: () => {
                    (0, tracks_1.recordEvent)('product_variations_preview', {
                        source: constants_1.TRACKS_SOURCE,
                        variation_id: singleSelection?.id,
                    });
                } }, (0, i18n_1.__)('Preview', 'fincommerce'))),
            (0, element_1.createElement)(toggle_visibility_menu_item_1.ToggleVisibilityMenuItem, { selection: selection, onChange: onChange, onClose: onClose })),
        (0, element_1.createElement)(variation_quick_update_menu_item_1.VariationQuickUpdateMenuItem.Slot, { group: 'top-level', onChange: onChange, onClose: onClose, selection: selection, supportsMultipleSelection: supportsMultipleSelection }),
        (0, element_1.createElement)(components_1.MenuGroup, null,
            (0, element_1.createElement)(pricing_menu_item_1.PricingMenuItem, { selection: selection, onChange: onChange, onClose: onClose, supportsMultipleSelection: supportsMultipleSelection }),
            (0, element_1.createElement)(inventory_menu_item_1.InventoryMenuItem, { selection: selection, onChange: onChange, onClose: onClose, supportsMultipleSelection: supportsMultipleSelection }),
            (0, element_1.createElement)(shipping_menu_item_1.ShippingMenuItem, { selection: selection, onChange: onChange, onClose: onClose, supportsMultipleSelection: supportsMultipleSelection }),
            (0, element_1.createElement)(downloads_menu_item_1.DownloadsMenuItem, { selection: selection, onChange: onChange, onClose: onClose, supportsMultipleSelection: supportsMultipleSelection })),
        (0, element_1.createElement)(variation_quick_update_menu_item_1.VariationQuickUpdateMenuItem.Slot, { group: 'secondary', onChange: onChange, onClose: onClose, selection: selection, supportsMultipleSelection: supportsMultipleSelection }),
        (0, element_1.createElement)(components_1.MenuGroup, null,
            (0, element_1.createElement)(components_1.MenuItem, { isDestructive: true, label: !supportsMultipleSelection
                    ? (0, i18n_1.__)('Delete variation', 'fincommerce')
                    : undefined, onClick: () => {
                    onDelete(selection);
                    onClose();
                }, className: "fincommerce-product-variations__actions--delete" }, (0, i18n_1.__)('Delete', 'fincommerce'))),
        (0, element_1.createElement)(variation_quick_update_menu_item_1.VariationQuickUpdateMenuItem.Slot, { group: 'tertiary', onChange: onChange, onClose: onClose, selection: selection, supportsMultipleSelection: supportsMultipleSelection })));
}
