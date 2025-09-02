/**
 * External dependencies
 */
import { CheckboxControl } from '@finpress/components';
import { createElement } from '@finpress/element';

/**
 * Internal dependencies
 */
import { ControlProps } from '../types';

export const CheckboxField = ( {
	field,
	onChange,
	...props
}: ControlProps ) => {
	const { label, description } = field;

	return (
		<CheckboxControl
			onChange={ ( val ) => onChange( val ) }
			title={ description }
			label={ label }
			{ ...props }
		/>
	);
};
