/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { RadioControl } from '@wordpress/components';
const RadioField = ({ label, value, onChange, options = [], }) => {
    return (createElement(RadioControl, { label: label, options: options, onChange: onChange, selected: value }));
};
export default RadioField;
