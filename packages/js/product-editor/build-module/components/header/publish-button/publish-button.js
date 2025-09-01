import { Button } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { useDispatch } from '@wordpress/data';
import { createElement } from '@wordpress/element';
import { getNewPath, navigateTo } from '@fincommerce/navigation';
import { recordEvent } from '@fincommerce/tracks';
/**
 * Internal dependencies
 */
import { wooProductEditorUiStore } from '../../../store/product-editor-ui';
import { useErrorHandler } from '../../../hooks/use-error-handler';
import { recordProductEvent } from '../../../utils/record-product-event';
import { useFeedbackBar } from '../../../hooks/use-feedback-bar';
import { TRACKS_SOURCE } from '../../../constants';
import { usePublish } from '../hooks/use-publish';
import { PublishButtonMenu } from './publish-button-menu';
import { showSuccessNotice } from './utils';
export function PublishButton({ productType = 'product', isMenuButton, isPrePublishPanelVisible = true, visibleTab = 'general', ...props }) {
    const { createErrorNotice } = useDispatch('core/notices');
    const { maybeShowFeedbackBar } = useFeedbackBar();
    const { openPrepublishPanel } = useDispatch(wooProductEditorUiStore);
    const { getProductErrorMessageAndProps } = useErrorHandler();
    const [editedStatus, , prevStatus] = useEntityProp('postType', productType, 'status');
    const publishButtonProps = usePublish({
        productType,
        ...props,
        onPublishSuccess(savedProduct) {
            const isPublished = savedProduct.status === 'publish' ||
                savedProduct.status === 'future';
            if (isPublished) {
                recordProductEvent('product_update', savedProduct);
            }
            showSuccessNotice(savedProduct, prevStatus);
            maybeShowFeedbackBar();
            if (prevStatus === 'auto-draft' || prevStatus === 'draft') {
                const url = getNewPath({}, `/product/${savedProduct.id}`);
                navigateTo({ url });
            }
        },
        async onPublishError(error) {
            const { message, errorProps } = await getProductErrorMessageAndProps(error, visibleTab);
            createErrorNotice(message, errorProps);
        },
    });
    if (productType === 'product' && isMenuButton) {
        function renderPublishButtonMenu(menuProps) {
            return (createElement(PublishButtonMenu, { ...menuProps, postType: productType, visibleTab: visibleTab }));
        }
        if (editedStatus !== 'publish' &&
            editedStatus !== 'future' &&
            window.wcAdminFeatures['product-pre-publish-modal'] &&
            isPrePublishPanelVisible) {
            function handlePrePublishButtonClick(event) {
                if (publishButtonProps['aria-disabled']) {
                    event.preventDefault();
                    return;
                }
                recordEvent('product_prepublish_panel', {
                    source: TRACKS_SOURCE,
                    action: 'view',
                });
                openPrepublishPanel();
            }
            return (createElement(PublishButtonMenu, { ...publishButtonProps, postType: productType, controls: undefined, onClick: handlePrePublishButtonClick, renderMenu: renderPublishButtonMenu, visibleTab: visibleTab }));
        }
        return (createElement(PublishButtonMenu, { ...publishButtonProps, postType: productType, controls: undefined, renderMenu: renderPublishButtonMenu, visibleTab: visibleTab }));
    }
    return createElement(Button, { ...publishButtonProps });
}
