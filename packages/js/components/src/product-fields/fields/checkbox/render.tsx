/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { CheckboxControl } from '@finpress/components';

/**
 * Internal dependencies
 */
import { BaseProductFieldProps } from '../types';

type CheckboxFieldProps = BaseProductFieldProps< boolean >;

const CheckboxField = ( { label, value, onChange }: CheckboxFieldProps ) => {
	return (
		<CheckboxControl
			label={ label }
			onChange={ onChange }
			checked={ value }
		/>
	);
};

export default CheckboxField;
