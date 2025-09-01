"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePassword = RequirePassword;
/**
 * External dependencies
 */
const compose_1 = require("@wordpress/compose");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const tracks_1 = require("@fincommerce/tracks");
const components_1 = require("@wordpress/components");
const constants_1 = require("../../constants");
function RequirePassword({ label, postPassword, onInputChange, }) {
    const postPasswordId = (0, compose_1.useInstanceId)(components_1.BaseControl, 'post_password');
    const [isPasswordRequired, setPasswordRequired] = (0, element_1.useState)(Boolean(postPassword));
    (0, element_1.useEffect)(() => {
        if (!isPasswordRequired && postPassword !== '') {
            setPasswordRequired(true);
        }
    }, [postPassword]);
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_1.CheckboxControl, { label: label, checked: isPasswordRequired, className: "wp-block-fincommerce-product-password-fields__field", onChange: (selected) => {
                (0, tracks_1.recordEvent)('product_catalog_require_password', {
                    source: constants_1.TRACKS_SOURCE,
                    value: selected,
                });
                setPasswordRequired(selected);
                if (!selected) {
                    onInputChange('');
                }
            } }),
        isPasswordRequired && ((0, element_1.createElement)(components_1.BaseControl, { id: postPasswordId, label: (0, i18n_1.__)('Password', 'fincommerce') },
            (0, element_1.createElement)(components_1.__experimentalInputControl, { id: postPasswordId, value: postPassword, onChange: (value) => {
                    onInputChange(value ?? '');
                } })))));
}
