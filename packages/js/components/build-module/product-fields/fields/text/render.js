/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { TextControl } from '@wordpress/components';
const TextField = ({ label, value, onChange }) => {
    return (createElement(TextControl, { label: label, onChange: onChange, value: value }));
};
export default TextField;
