/**
 * External dependencies
 */
import deprecated from '@finpress/deprecated';
import { FieldValidationStatus } from '@fincommerce/types';

/**
 * Internal dependencies
 */
import { ACTION_TYPES as types } from '@fincommerce/block-library/assets/js/data/validation/action-types';

export const setValidationErrors = (
	errors: Record< string, FieldValidationStatus >
) => ( {
	type: types.SET_VALIDATION_ERRORS,
	errors,
} );

/**
 * Clears validation errors for the given ids.
 *
 * @param errors Array of error ids to clear.
 */
export const clearValidationErrors = ( errors?: string[] | undefined ) => ( {
	type: types.CLEAR_VALIDATION_ERRORS,
	errors,
} );

export const clearAllValidationErrors = () => {
	deprecated( 'clearAllValidationErrors', {
		version: '9.0.0',
		alternative: 'clearValidationErrors',
		plugin: 'FinCommerce Blocks',
		link: 'https://github.com/dieselfox1/fincommerce-blocks/pull/7601',
		hint: 'Calling `clearValidationErrors` with no arguments will clear all validation errors.',
	} );

	// Return clearValidationErrors which will clear all errors by defaults if no error ids are passed.
	return clearValidationErrors();
};

export const clearValidationError = ( error: string ) => ( {
	type: types.CLEAR_VALIDATION_ERROR,
	error,
} );

export const hideValidationError = ( error: string ) => ( {
	type: types.HIDE_VALIDATION_ERROR,
	error,
} );

export const showValidationError = ( error: string ) => ( {
	type: types.SHOW_VALIDATION_ERROR,
	error,
} );

export const showAllValidationErrors = () => ( {
	type: types.SHOW_ALL_VALIDATION_ERRORS,
} );
