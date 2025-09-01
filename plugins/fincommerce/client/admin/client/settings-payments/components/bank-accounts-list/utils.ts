/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Determines the label for the sort code field based on the country.
 *
 * @param  country The country code (e.g., 'AU', 'CA', etc.).
 *
 * @return {string} The label for the sort code field.
 */
export const getSortCodeLabel = ( country: string ): string => {
	switch ( country ) {
		case 'AU':
			return __( 'BSB', 'fincommerce' );
		case 'CA':
			return __( 'Bank transit number', 'fincommerce' );
		case 'IN':
			return __( 'IFSC', 'fincommerce' );
		case 'IT':
			return __( 'Branch sort', 'fincommerce' );
		case 'NZ':
		case 'SE':
			return __( 'Bank code', 'fincommerce' );
		case 'US':
			return __( 'Routing number', 'fincommerce' );
		case 'ZA':
			return __( 'Branch code', 'fincommerce' );
		case 'GB':
		case 'IE':
			return __( 'Sort code', 'fincommerce' );
		default:
			return __( 'Sort code', 'fincommerce' );
	}
};

/**
 * Determines whether to display the sort code field based on the country.
 *
 * @param  country The country code (e.g., 'AU', 'CA', etc.).
 *
 * @return {boolean} True if the sort code field should be displayed, false otherwise.
 */
export const shouldDisplaySortCode = ( country: string ): boolean => {
	switch ( country ) {
		case 'AU':
		case 'CA':
		case 'IN':
		case 'IT':
		case 'NZ':
		case 'SE':
		case 'US':
		case 'ZA':
		case 'GB':
		case 'IE':
			return true;
		default:
			return false;
	}
};

/**
 * Format the sort code based on the country.
 *
 * @param  sortCode The sort code to format.
 * @param  country  The country code (e.g., 'AU', 'CA', etc.).
 *
 * @return {string} The formatted sort code.
 */
export const formatSortCode = ( sortCode: string, country: string ): string => {
	if ( country !== 'GB' && country !== 'IE' ) {
		return sortCode;
	}

	return (
		sortCode
			.replace( /\D/g, '' ) // Remove non-digit characters
			.substring( 0, 6 ) // Take only first 6 digits
			.match( /.{1,2}/g )
			?.join( '-' ) ?? ''
	);
};

/**
 * Generates a random ID.
 *
 * @return {string} A random ID string.
 */
export const generateId = (): string =>
	Math.random().toString( 36 ).substring( 2, 10 );
