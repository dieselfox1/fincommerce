/**
 * External dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { createElement, Fragment, useEffect, useState, } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { recordEvent } from '@fincommerce/tracks';
import { BaseControl, CheckboxControl, __experimentalInputControl as InputControl, } from '@wordpress/components';
import { TRACKS_SOURCE } from '../../constants';
export function RequirePassword({ label, postPassword, onInputChange, }) {
    const postPasswordId = useInstanceId(BaseControl, 'post_password');
    const [isPasswordRequired, setPasswordRequired] = useState(Boolean(postPassword));
    useEffect(() => {
        if (!isPasswordRequired && postPassword !== '') {
            setPasswordRequired(true);
        }
    }, [postPassword]);
    return (createElement(Fragment, null,
        createElement(CheckboxControl, { label: label, checked: isPasswordRequired, className: "wp-block-fincommerce-product-password-fields__field", onChange: (selected) => {
                recordEvent('product_catalog_require_password', {
                    source: TRACKS_SOURCE,
                    value: selected,
                });
                setPasswordRequired(selected);
                if (!selected) {
                    onInputChange('');
                }
            } }),
        isPasswordRequired && (createElement(BaseControl, { id: postPasswordId, label: __('Password', 'fincommerce') },
            createElement(InputControl, { id: postPasswordId, value: postPassword, onChange: (value) => {
                    onInputChange(value ?? '');
                } })))));
}
