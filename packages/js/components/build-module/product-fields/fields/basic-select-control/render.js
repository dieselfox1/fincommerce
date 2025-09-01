/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
const SelectControlField = ({ label, value, onChange, multiple, options = [], }) => {
    return (createElement(Fragment, null,
        createElement(SelectControl, { multiple: multiple, label: label, options: options, onChange: onChange, value: value })));
};
export default SelectControlField;
