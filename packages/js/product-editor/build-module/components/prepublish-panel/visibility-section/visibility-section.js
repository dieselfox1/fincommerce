/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';
import { recordEvent } from '@fincommerce/tracks';
import { CheckboxControl, PanelBody } from '@wordpress/components';
import { TRACKS_SOURCE } from '../../../constants';
import { RequirePassword } from '../../require-password';
import { CatalogVisibility } from '../../catalog-visibility';
export function VisibilitySection({ productType }) {
    const [catalogVisibility, setCatalogVisibility] = useEntityProp('postType', productType, 'catalog_visibility');
    const [reviewsAllowed, setReviewsAllowed] = useEntityProp('postType', productType, 'reviews_allowed');
    const [postPassword, setPostPassword] = useEntityProp('postType', productType, 'post_password');
    function getVisibilityLabel() {
        if (postPassword !== '') {
            return __('Password protected', 'fincommerce');
        }
        if (catalogVisibility === 'hidden') {
            return __('Hidden', 'fincommerce');
        }
        return __('Public', 'fincommerce');
    }
    return (createElement(PanelBody, { initialOpen: false, 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore We need to send an Element.
        title: [
            __('Visibility: ', 'fincommerce'),
            createElement("span", { className: "editor-post-publish-panel__link", key: "label" }, getVisibilityLabel()),
        ] },
        createElement("div", { className: "fincommerce-publish-panel-visibility" },
            createElement("fieldset", { className: "fincommerce-publish-panel-visibility__fieldset" },
                createElement("legend", { className: "fincommerce-publish-panel-visibility__legend" }, __('Control how this product is viewed by customers and other site users.', 'fincommerce')),
                createElement(CatalogVisibility, { catalogVisibility: catalogVisibility, label: __('Hide in product catalog', 'fincommerce'), visibility: 'search', onCheckboxChange: setCatalogVisibility }),
                createElement(CatalogVisibility, { catalogVisibility: catalogVisibility, label: __('Hide from search results', 'fincommerce'), visibility: 'catalog', onCheckboxChange: setCatalogVisibility }),
                createElement(CheckboxControl, { label: __('Enable product reviews', 'fincommerce'), checked: reviewsAllowed, onChange: (selected) => {
                        setReviewsAllowed(selected);
                        recordEvent('product_prepublish_panel', {
                            source: TRACKS_SOURCE,
                            action: 'enable_product_reviews',
                            value: selected,
                        });
                    } }),
                createElement(RequirePassword, { label: __('Require a password', 'fincommerce'), postPassword: postPassword, onInputChange: setPostPassword })))));
}
