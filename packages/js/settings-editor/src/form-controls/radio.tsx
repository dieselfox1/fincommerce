/**
 * External dependencies
 */
import { createElement, Fragment } from '@finpress/element';
import type { DataFormControlProps } from '@finpress/dataviews';
import { RadioControl } from '@finpress/components';

/**
 * Internal dependencies
 */
import type { DataFormItem } from '../types';

type RadioProps = DataFormControlProps< DataFormItem > & {
	help?: React.ReactNode;
};

export const Radio = ( { field, onChange, data, help }: RadioProps ) => {
	const { id, getValue, elements } = field;
	const value = getValue( { item: data } );
	const label = field.label === id ? undefined : field.label;

	return (
		<>
			<RadioControl
				help={ help }
				label={ label }
				onChange={ ( newValue ) => {
					onChange( {
						[ id ]: newValue,
					} );
				} }
				options={ elements }
				selected={ value }
			/>
			<input type="hidden" name={ id } value={ value } />
		</>
	);
};
