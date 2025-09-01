/**
 * External dependencies
 */
import { Tag, __experimentalTooltip as Tooltip } from '@fincommerce/components';
import { CurrencyContext } from '@fincommerce/currency';
import { getNewPath } from '@fincommerce/navigation';
import { recordEvent } from '@fincommerce/tracks';
import { Button, CheckboxControl, Dropdown, Spinner, } from '@wordpress/components';
import { createElement, Fragment, useContext, useMemo, } from '@wordpress/element';
import { plus, info, Icon } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';
import clsx from 'clsx';
/**
 * Internal dependencies
 */
import { PRODUCT_VARIATION_TITLE_LIMIT, TRACKS_SOURCE, } from '../../../constants';
import HiddenIcon from '../../../icons/hidden-icon';
import { getProductStockStatus, getProductStockStatusClass, truncate, } from '../../../utils';
import { SingleUpdateMenu } from '../variation-actions-menus';
import { ImageActionsMenu } from '../image-actions-menu';
import { VariationStockStatusForm } from '../variation-stock-status-form/variation-stock-status-form';
import { VariationPricingForm } from '../variation-pricing-form';
const NOT_VISIBLE_TEXT = __('Not visible to customers', 'fincommerce');
function getEditVariationLink(variation) {
    return getNewPath({}, `/product/${variation.parent_id}/variation/${variation.id}`, {});
}
export function VariationsTableRow({ variation, variableAttributes, isUpdating, isSelected, isSelectionDisabled, hideActionButtons, onChange, onDelete, onEdit, onSelect, }) {
    const { formatAmount } = useContext(CurrencyContext);
    const { matchesAny, tags } = useMemo(function getAnyWhenVariationOptionIsNotPresentInProductAttributes() {
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
                label: sprintf(
                // translators: %s is the attribute's name
                __('Any %s', 'fincommerce'), attribute.name),
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
                recordEvent('product_variations_inline_select', {
                    source: TRACKS_SOURCE,
                    product_id: variation.parent_id,
                    variation_id: variation.id,
                    selected_option: option,
                });
            }
            onToggle();
        };
    }
    function renderImageActionsMenu() {
        return (createElement(ImageActionsMenu, { selection: [variation], onChange: handleChange, onDelete: handleDelete, renderToggle: ({ isOpen, onToggle, isBusy }) => isBusy ? (createElement("div", { className: "fincommerce-product-variations__add-image-button" },
                createElement(Spinner, { "aria-label": __('Loading image', 'fincommerce') }))) : (createElement(Button, { className: clsx(variation.image
                    ? 'fincommerce-product-variations__image-button'
                    : 'fincommerce-product-variations__add-image-button'), icon: variation.image ? undefined : plus, iconSize: variation.image ? undefined : 16, 
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore this exists in the props but is not typed
                size: "compact", onClick: toggleHandler('image', isOpen, onToggle) }, variation.image && (createElement("div", { className: "fincommerce-product-variations__image", style: {
                    backgroundImage: `url('${variation.image.src}')`,
                } })))) }));
    }
    function renderPrices() {
        return (createElement(Fragment, null,
            variation.on_sale && (createElement("span", { className: "fincommerce-product-variations__sale-price" }, formatAmount(variation.sale_price))),
            createElement("span", { className: clsx('fincommerce-product-variations__regular-price', {
                    'fincommerce-product-variations__regular-price--on-sale': variation.on_sale,
                }) }, formatAmount(variation.regular_price))));
    }
    function renderPriceForm(onClose) {
        return (createElement(VariationPricingForm, { initialValue: variation, onSubmit: (editedVariation) => {
                onChange({ ...editedVariation, id: variation.id }, true);
                onClose();
            }, onCancel: onClose }));
    }
    function renderPriceCellContent() {
        if (!variation.regular_price)
            return null;
        return (createElement(Dropdown, { contentClassName: "fincommerce-product-variations__pricing-actions-menu", popoverProps: {
                placement: 'bottom',
            }, renderToggle: ({ isOpen, onToggle }) => (createElement(Button, { onClick: toggleHandler('price', isOpen, onToggle) }, renderPrices())), renderContent: ({ onClose }) => renderPriceForm(onClose) }));
    }
    function renderStockStatus() {
        return (createElement(Fragment, null,
            createElement("span", { className: clsx('fincommerce-product-variations__status-dot', getProductStockStatusClass(variation)) }, "\u25CF"),
            getProductStockStatus(variation)));
    }
    function renderStockStatusForm(onClose) {
        return (createElement(VariationStockStatusForm, { initialValue: variation, onSubmit: (editedVariation) => {
                onChange({ ...editedVariation, id: variation.id }, true);
                onClose();
            }, onCancel: onClose }));
    }
    function renderStockCellContent() {
        if (!variation.regular_price)
            return null;
        return (createElement(Dropdown, { contentClassName: "fincommerce-product-variations__stock-status-actions-menu", popoverProps: {
                placement: 'bottom',
            }, renderToggle: ({ isOpen, onToggle }) => (createElement(Button, { onClick: toggleHandler('stock', isOpen, onToggle), variant: "tertiary" }, renderStockStatus())), renderContent: ({ onClose }) => renderStockStatusForm(onClose) }));
    }
    return (createElement(Fragment, null,
        createElement("div", { className: "fincommerce-product-variations__selection", role: "cell" },
            matchesAny && (createElement(Tooltip, { text: __("'Any' variations are no longer fully supported. Use regular variations instead", 'fincommerce'), helperText: __('View helper text', 'fincommerce'), position: "middle right" },
                createElement(Icon, { icon: info, size: 24 }))),
            isUpdating ? (createElement(Spinner, null)) : (createElement(CheckboxControl, { value: variation.id, checked: isSelected, onChange: onSelect, disabled: isSelectionDisabled, "aria-label": isSelected
                    ? __('Unselect variation', 'fincommerce')
                    : __('Select variation', 'fincommerce') }))),
        createElement("div", { className: "fincommerce-product-variations__attributes-cell", role: "cell" },
            renderImageActionsMenu(),
            createElement("div", { className: "fincommerce-product-variations__attributes" }, tags.map((tagInfo) => {
                const tag = (createElement(Tag, { id: tagInfo.id, className: "fincommerce-product-variations__attribute", key: tagInfo.id, label: truncate(tagInfo.label, PRODUCT_VARIATION_TITLE_LIMIT), screenReaderLabel: tagInfo.label }));
                return tags.length <= PRODUCT_VARIATION_TITLE_LIMIT ? (tag) : (createElement(Tooltip, { key: tagInfo.id, text: tagInfo.label, position: "top center" },
                    createElement("span", null, tag)));
            }))),
        createElement("div", { className: clsx('fincommerce-product-variations__price', {
                'fincommerce-product-variations__price--fade': variation.status === 'private',
            }), role: "cell" }, renderPriceCellContent()),
        createElement("div", { className: clsx('fincommerce-product-variations__quantity', {
                'fincommerce-product-variations__quantity--fade': variation.status === 'private',
            }), role: "cell" }, renderStockCellContent()),
        createElement("div", { className: "fincommerce-product-variations__actions", role: "cell" },
            (variation.status === 'private' ||
                !variation.regular_price) && (createElement(Tooltip, { className: "fincommerce-attribute-list-item__actions-tooltip", position: "top center", text: NOT_VISIBLE_TEXT },
                createElement("div", { className: "fincommerce-attribute-list-item__actions-icon-wrapper" },
                    createElement(HiddenIcon, { className: "fincommerce-attribute-list-item__actions-icon-wrapper-icon" })))),
            hideActionButtons && (createElement(Fragment, null,
                createElement(Button, { href: getEditVariationLink(variation), onClick: onEdit }, __('Edit', 'fincommerce')),
                createElement(SingleUpdateMenu, { selection: [variation], onChange: handleChange, onDelete: handleDelete }))))));
}
