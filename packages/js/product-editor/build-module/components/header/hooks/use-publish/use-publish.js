import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { useShortcut } from '@wordpress/keyboard-shortcuts';
/**
 * Internal dependencies
 */
import { useProductManager } from '../../../../hooks/use-product-manager';
import { useProductScheduled } from '../../../../hooks/use-product-scheduled';
export function usePublish({ productType = 'product', disabled, onClick, onPublishSuccess, onPublishError, ...props }) {
    const { isValidating, isDirty, isPublishing, publish } = useProductManager(productType);
    const [, , prevStatus] = useEntityProp('postType', productType, 'status');
    const { isScheduled } = useProductScheduled(productType);
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
            return __('Schedule', 'fincommerce');
        }
        if (prevStatus === 'publish' || prevStatus === 'future') {
            return __('Update', 'fincommerce');
        }
        return __('Publish', 'fincommerce');
    }
    useShortcut('core/editor/save', (event) => {
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
