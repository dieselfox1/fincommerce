"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePublish = usePublish;
const core_data_1 = require("@wordpress/core-data");
const i18n_1 = require("@wordpress/i18n");
const keyboard_shortcuts_1 = require("@wordpress/keyboard-shortcuts");
/**
 * Internal dependencies
 */
const use_product_manager_1 = require("../../../../hooks/use-product-manager");
const use_product_scheduled_1 = require("../../../../hooks/use-product-scheduled");
function usePublish({ productType = 'product', disabled, onClick, onPublishSuccess, onPublishError, ...props }) {
    const { isValidating, isDirty, isPublishing, publish } = (0, use_product_manager_1.useProductManager)(productType);
    const [, , prevStatus] = (0, core_data_1.useEntityProp)('postType', productType, 'status');
    const { isScheduled } = (0, use_product_scheduled_1.useProductScheduled)(productType);
    const isBusy = isPublishing || isValidating;
    const isDisabled = prevStatus !== 'draft' && (disabled || isBusy || !isDirty);
    const handlePublish = () => publish().then(onPublishSuccess).catch(onPublishError);
    function handleClick(event) {
        if (isDisabled) {
            event.preventDefault?.();
            return;
        }
        if (onClick) {
            onClick(event);
        }
        handlePublish();
    }
    function getButtonText() {
        if (isScheduled) {
            return (0, i18n_1.__)('Schedule', 'fincommerce');
        }
        if (prevStatus === 'publish' || prevStatus === 'future') {
            return (0, i18n_1.__)('Update', 'fincommerce');
        }
        return (0, i18n_1.__)('Publish', 'fincommerce');
    }
    (0, keyboard_shortcuts_1.useShortcut)('core/editor/save', (event) => {
        event.preventDefault();
        if (!isDisabled &&
            (prevStatus === 'publish' || prevStatus === 'future')) {
            handlePublish();
        }
    });
    return {
        children: getButtonText(),
        ...props,
        isBusy,
        'aria-disabled': isDisabled,
        variant: 'primary',
        onClick: handleClick,
    };
}
