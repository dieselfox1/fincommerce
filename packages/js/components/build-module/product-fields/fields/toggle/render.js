/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { Tooltip } from '../../../tooltip';
const ToggleField = ({ label, value, onChange, tooltip, disabled = false, }) => {
    return (createElement(ToggleControl, { label: createElement(Fragment, null,
            label,
            tooltip && createElement(Tooltip, { text: tooltip })), checked: value, onChange: onChange, disabled: disabled }));
};
export default ToggleField;
