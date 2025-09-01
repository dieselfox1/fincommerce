"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariationsTableRow = VariationsTableRow;
/**
 * External dependencies
 */
const components_1 = require("@fincommerce/components");
const currency_1 = require("@fincommerce/currency");
const navigation_1 = require("@fincommerce/navigation");
const tracks_1 = require("@fincommerce/tracks");
const components_2 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const constants_1 = require("../../../constants");
const hidden_icon_1 = __importDefault(require("../../../icons/hidden-icon"));
const utils_1 = require("../../../utils");
const variation_actions_menus_1 = require("../variation-actions-menus");
const image_actions_menu_1 = require("../image-actions-menu");
const variation_stock_status_form_1 = require("../variation-stock-status-form/variation-stock-status-form");
const variation_pricing_form_1 = require("../variation-pricing-form");
const NOT_VISIBLE_TEXT = (0, i18n_1.__)('Not visible to customers', 'fincommerce');
function getEditVariationLink(variation) {
    return (0, navigation_1.getNewPath)({}, `/product/${variation.parent_id}/variation/${variation.id}`, {});
}
function VariationsTableRow({ variation, variableAttributes, isUpdating, isSelected, isSelectionDisabled, hideActionButtons, onChange, onDelete, onEdit, onSelect, }) {
    const { formatAmount } = (0, element_1.useContext)(currency_1.CurrencyContext);
    const { matchesAny, tags } = (0, element_1.useMemo)(function getAnyWhenVariationOptionIsNotPresentInProductAttributes() {
        let matches = false;
        const tagItems = variableAttributes.map((attribute) => {
            const variationOption = variation.attributes.find((option) => option.id === attribute.id);
            if (variationOption) {
                return {
                    id: variationOption.id,
                    label: variationOption.option,
                };
            }
            matches = true;
            return {
                id: attribute.id,
                label: (0, i18n_1.sprintf)(
                // translators: %s is the attribute's name
                (0, i18n_1.__)('Any %s', 'fincommerce'), attribute.name),
            };
        });
        return {
            matchesAny: matches,
            tags: tagItems,
        };
    }, [variableAttributes, variation]);
    function handleChange(values, showSuccess) {
        onChange(values[0], showSuccess);
    }
    function handleDelete(values) {
        onDelete(values[0]);
    }
    function toggleHandler(option, isOpen, onToggle) {
        return function handleToggle() {
            if (!isOpen) {
                (0, tracks_1.recordEvent)('product_variations_inline_select', {
                    source: constants_1.TRACKS_SOURCE,
                    product_id: variation.parent_id,
                    variation_id: variation.id,
                    selected_option: option,
                });
            }
            onToggle();
        };
    }
    function renderImageActionsMenu() {
        return ((0, element_1.createElement)(image_actions_menu_1.ImageActionsMenu, { selection: [variation], onChange: handleChange, onDelete: handleDelete, renderToggle: ({ isOpen, onToggle, isBusy }) => isBusy ? ((0, element_1.createElement)("div", { className: "fincommerce-product-variations__add-image-button" },
                (0, element_1.createElement)(components_2.Spinner, { "aria-label": (0, i18n_1.__)('Loading image', 'fincommerce') }))) : ((0, element_1.createElement)(components_2.Button, { className: (0, clsx_1.default)(variation.image
                    ? 'fincommerce-product-variations__image-button'
                    : 'fincommerce-product-variations__add-image-button'), icon: variation.image ? undefined : icons_1.plus, iconSize: variation.image ? undefined : 16, 
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore this exists in the props but is not typed
                size: "compact", onClick: toggleHandler('image', isOpen, onToggle) }, variation.image && ((0, element_1.createElement)("div", { className: "fincommerce-product-variations__image", style: {
                    backgroundImage: `url('${variation.image.src}')`,
                } })))) }));
    }
    function renderPrices() {
        return ((0, element_1.createElement)(element_1.Fragment, null,
            variation.on_sale && ((0, element_1.createElement)("span", { className: "fincommerce-product-variations__sale-price" }, formatAmount(variation.sale_price))),
            (0, element_1.createElement)("span", { className: (0, clsx_1.default)('fincommerce-product-variations__regular-price', {
                    'fincommerce-product-variations__regular-price--on-sale': variation.on_sale,
                }) }, formatAmount(variation.regular_price))));
    }
    function renderPriceForm(onClose) {
        return ((0, element_1.createElement)(variation_pricing_form_1.VariationPricingForm, { initialValue: variation, onSubmit: (editedVariation) => {
                onChange({ ...editedVariation, id: variation.id }, true);
                onClose();
            }, onCancel: onClose }));
    }
    function renderPriceCellContent() {
        if (!variation.regular_price)
            return null;
        return ((0, element_1.createElement)(components_2.Dropdown, { contentClassName: "fincommerce-product-variations__pricing-actions-menu", popoverProps: {
                placement: 'bottom',
            }, renderToggle: ({ isOpen, onToggle }) => ((0, element_1.createElement)(components_2.Button, { onClick: toggleHandler('price', isOpen, onToggle) }, renderPrices())), renderContent: ({ onClose }) => renderPriceForm(onClose) }));
    }
    function renderStockStatus() {
        return ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)("span", { className: (0, clsx_1.default)('fincommerce-product-variations__status-dot', (0, utils_1.getProductStockStatusClass)(variation)) }, "\u25CF"),
            (0, utils_1.getProductStockStatus)(variation)));
    }
    function renderStockStatusForm(onClose) {
        return ((0, element_1.createElement)(variation_stock_status_form_1.VariationStockStatusForm, { initialValue: variation, onSubmit: (editedVariation) => {
                onChange({ ...editedVariation, id: variation.id }, true);
                onClose();
            }, onCancel: onClose }));
    }
    function renderStockCellContent() {
        if (!variation.regular_price)
            return null;
        return ((0, element_1.createElement)(components_2.Dropdown, { contentClassName: "fincommerce-product-variations__stock-status-actions-menu", popoverProps: {
                placement: 'bottom',
            }, renderToggle: ({ isOpen, onToggle }) => ((0, element_1.createElement)(components_2.Button, { onClick: toggleHandler('stock', isOpen, onToggle), variant: "tertiary" }, renderStockStatus())), renderContent: ({ onClose }) => renderStockStatusForm(onClose) }));
    }
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)("div", { className: "fincommerce-product-variations__selection", role: "cell" },
            matchesAny && ((0, element_1.createElement)(components_1.__experimentalTooltip, { text: (0, i18n_1.__)("'Any' variations are no longer fully supported. Use regular variations instead", 'fincommerce'), helperText: (0, i18n_1.__)('View helper text', 'fincommerce'), position: "middle right" },
                (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.info, size: 24 }))),
            isUpdating ? ((0, element_1.createElement)(components_2.Spinner, null)) : ((0, element_1.createElement)(components_2.CheckboxControl, { value: variation.id, checked: isSelected, onChange: onSelect, disabled: isSelectionDisabled, "aria-label": isSelected
                    ? (0, i18n_1.__)('Unselect variation', 'fincommerce')
                    : (0, i18n_1.__)('Select variation', 'fincommerce') }))),
        (0, element_1.createElement)("div", { className: "fincommerce-product-variations__attributes-cell", role: "cell" },
            renderImageActionsMenu(),
            (0, element_1.createElement)("div", { className: "fincommerce-product-variations__attributes" }, tags.map((tagInfo) => {
                const tag = ((0, element_1.createElement)(components_1.Tag, { id: tagInfo.id, className: "fincommerce-product-variations__attribute", key: tagInfo.id, label: (0, utils_1.truncate)(tagInfo.label, constants_1.PRODUCT_VARIATION_TITLE_LIMIT), screenReaderLabel: tagInfo.label }));
                return tags.length <= constants_1.PRODUCT_VARIATION_TITLE_LIMIT ? (tag) : ((0, element_1.createElement)(components_1.__experimentalTooltip, { key: tagInfo.id, text: tagInfo.label, position: "top center" },
                    (0, element_1.createElement)("span", null, tag)));
            }))),
        (0, element_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-product-variations__price', {
                'fincommerce-product-variations__price--fade': variation.status === 'private',
            }), role: "cell" }, renderPriceCellContent()),
        (0, element_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-product-variations__quantity', {
                'fincommerce-product-variations__quantity--fade': variation.status === 'private',
            }), role: "cell" }, renderStockCellContent()),
        (0, element_1.createElement)("div", { className: "fincommerce-product-variations__actions", role: "cell" },
            (variation.status === 'private' ||
                !variation.regular_price) && ((0, element_1.createElement)(components_1.__experimentalTooltip, { className: "fincommerce-attribute-list-item__actions-tooltip", position: "top center", text: NOT_VISIBLE_TEXT },
                (0, element_1.createElement)("div", { className: "fincommerce-attribute-list-item__actions-icon-wrapper" },
                    (0, element_1.createElement)(hidden_icon_1.default, { className: "fincommerce-attribute-list-item__actions-icon-wrapper-icon" })))),
            hideActionButtons && ((0, element_1.createElement)(element_1.Fragment, null,
                (0, element_1.createElement)(components_2.Button, { href: getEditVariationLink(variation), onClick: onEdit }, (0, i18n_1.__)('Edit', 'fincommerce')),
                (0, element_1.createElement)(variation_actions_menus_1.SingleUpdateMenu, { selection: [variation], onChange: handleChange, onDelete: handleDelete }))))));
}
