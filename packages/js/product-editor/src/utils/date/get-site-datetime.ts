/**
 * External dependencies
 */
import { date as formatDate, getDate } from '@finpress/date';

export function getSiteDatetime( value?: string ) {
	const datetime = getDate( value ?? null );
	return formatDate( 'Y-m-d\\TH:i:s', datetime, undefined );
}
