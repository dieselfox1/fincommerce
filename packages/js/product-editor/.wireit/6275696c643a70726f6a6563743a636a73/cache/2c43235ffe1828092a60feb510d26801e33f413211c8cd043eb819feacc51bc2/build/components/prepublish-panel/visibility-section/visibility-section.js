"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisibilitySection = VisibilitySection;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const core_data_1 = require("@wordpress/core-data");
const tracks_1 = require("@fincommerce/tracks");
const components_1 = require("@wordpress/components");
const constants_1 = require("../../../constants");
const require_password_1 = require("../../require-password");
const catalog_visibility_1 = require("../../catalog-visibility");
function VisibilitySection({ productType }) {
    const [catalogVisibility, setCatalogVisibility] = (0, core_data_1.useEntityProp)('postType', productType, 'catalog_visibility');
    const [reviewsAllowed, setReviewsAllowed] = (0, core_data_1.useEntityProp)('postType', productType, 'reviews_allowed');
    const [postPassword, setPostPassword] = (0, core_data_1.useEntityProp)('postType', productType, 'post_password');
    function getVisibilityLabel() {
        if (postPassword !== '') {
            return (0, i18n_1.__)('Password protected', 'fincommerce');
        }
        if (catalogVisibility === 'hidden') {
            return (0, i18n_1.__)('Hidden', 'fincommerce');
        }
        return (0, i18n_1.__)('Public', 'fincommerce');
    }
    return ((0, element_1.createElement)(components_1.PanelBody, { initialOpen: false, 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore We need to send an Element.
        title: [
            (0, i18n_1.__)('Visibility: ', 'fincommerce'),
            (0, element_1.createElement)("span", { className: "editor-post-publish-panel__link", key: "label" }, getVisibilityLabel()),
        ] },
        (0, element_1.createElement)("div", { className: "fincommerce-publish-panel-visibility" },
            (0, element_1.createElement)("fieldset", { className: "fincommerce-publish-panel-visibility__fieldset" },
                (0, element_1.createElement)("legend", { className: "fincommerce-publish-panel-visibility__legend" }, (0, i18n_1.__)('Control how this product is viewed by customers and other site users.', 'fincommerce')),
                (0, element_1.createElement)(catalog_visibility_1.CatalogVisibility, { catalogVisibility: catalogVisibility, label: (0, i18n_1.__)('Hide in product catalog', 'fincommerce'), visibility: 'search', onCheckboxChange: setCatalogVisibility }),
                (0, element_1.createElement)(catalog_visibility_1.CatalogVisibility, { catalogVisibility: catalogVisibility, label: (0, i18n_1.__)('Hide from search results', 'fincommerce'), visibility: 'catalog', onCheckboxChange: setCatalogVisibility }),
                (0, element_1.createElement)(components_1.CheckboxControl, { label: (0, i18n_1.__)('Enable product reviews', 'fincommerce'), checked: reviewsAllowed, onChange: (selected) => {
                        setReviewsAllowed(selected);
                        (0, tracks_1.recordEvent)('product_prepublish_panel', {
                            source: constants_1.TRACKS_SOURCE,
                            action: 'enable_product_reviews',
                            value: selected,
                        });
                    } }),
                (0, element_1.createElement)(require_password_1.RequirePassword, { label: (0, i18n_1.__)('Require a password', 'fincommerce'), postPassword: postPassword, onInputChange: setPostPassword })))));
}
