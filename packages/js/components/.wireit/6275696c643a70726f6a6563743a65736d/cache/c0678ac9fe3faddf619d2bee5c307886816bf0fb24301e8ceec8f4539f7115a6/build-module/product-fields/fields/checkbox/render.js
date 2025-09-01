/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';
const CheckboxField = ({ label, value, onChange }) => {
    return (createElement(CheckboxControl, { label: label, onChange: onChange, checked: value }));
};
export default CheckboxField;
