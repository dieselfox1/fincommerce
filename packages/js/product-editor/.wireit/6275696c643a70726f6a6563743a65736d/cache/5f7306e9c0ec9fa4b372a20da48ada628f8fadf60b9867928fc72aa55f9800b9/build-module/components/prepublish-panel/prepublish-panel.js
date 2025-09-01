/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createElement, Fragment, useRef, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { recordEvent } from '@fincommerce/tracks';
import { useEntityProp } from '@wordpress/core-data';
import { closeSmall } from '@wordpress/icons';
import clsx from 'clsx';
import { isInTheFuture } from '@wordpress/date';
/**
 * Internal dependencies
 */
import { PublishButton } from '../header/publish-button';
import { wooProductEditorUiStore } from '../../store/product-editor-ui';
import { TRACKS_SOURCE } from '../../constants';
import { VisibilitySection } from './visibility-section';
import { ScheduleSection } from './schedule-section';
import { PostPublishSection, PostPublishTitle } from './post-publish';
export function PrepublishPanel({ productType = 'product', title = __('Are you ready to publish this product?', 'fincommerce'), description = __('Double-check your settings before sharing this product with customers.', 'fincommerce'), }) {
    const [editedDate] = useEntityProp('postType', productType, 'date_created_gmt');
    const [productStatus, , prevStatus] = useEntityProp('postType', productType, 'status');
    const { closePrepublishPanel } = useDispatch(wooProductEditorUiStore);
    const isPublishedOrScheduled = productType === 'product' && prevStatus !== 'future'
        ? productStatus === 'publish'
        : true;
    if (isInTheFuture(editedDate)) {
        title = __('Are you ready to schedule this product?', 'fincommerce');
        description = __('Your product will be published at the specified date and time.', 'fincommerce');
    }
    const panelRef = useRef(null);
    function handleClickOutside(event) {
        if (panelRef.current &&
            !panelRef.current.contains(event.target)) {
            closePrepublishPanel();
        }
    }
    useEffect(() => {
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
            return (createElement(Button, { className: "fincommerce-publish-panel-close", icon: closeSmall, label: __('Close panel', 'fincommerce'), onClick: () => {
                    recordEvent('product_prepublish_panel', {
                        source: TRACKS_SOURCE,
                        action: 'close',
                    });
                    closePrepublishPanel();
                } }));
        }
        return (createElement(Fragment, null,
            createElement(PublishButton, { productType: productType }),
            createElement(Button, { variant: 'secondary', onClick: () => {
                    recordEvent('product_prepublish_panel', {
                        source: TRACKS_SOURCE,
                        action: 'cancel',
                    });
                    closePrepublishPanel();
                } }, __('Cancel', 'fincommerce'))));
    }
    function getPanelTitle() {
        if (isPublishedOrScheduled) {
            return createElement(PostPublishTitle, { productType: productType });
        }
        return (createElement(Fragment, null,
            createElement("h4", null, title),
            createElement("span", null, description)));
    }
    function getPanelSections() {
        if (isPublishedOrScheduled) {
            return createElement(PostPublishSection, { postType: productType });
        }
        return (createElement(Fragment, null,
            createElement(VisibilitySection, { productType: productType }),
            createElement(ScheduleSection, { postType: productType })));
    }
    return (createElement("div", { ref: panelRef, className: clsx('fincommerce-product-publish-panel', {
            'is-published': isPublishedOrScheduled,
        }) },
        createElement("div", { className: "fincommerce-product-publish-panel__header" }, getHeaderActions()),
        createElement("div", { className: "fincommerce-product-publish-panel__title" }, getPanelTitle()),
        createElement("div", { className: "fincommerce-product-publish-panel__content" }, getPanelSections()),
        createElement("div", { className: "fincommerce-product-publish-panel__footer" })));
}
