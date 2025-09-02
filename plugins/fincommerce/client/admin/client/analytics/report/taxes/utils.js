/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

export function getTaxCode( tax ) {
	return [
		tax.country,
		tax.state,
		tax.name || __( 'TAX', 'fincommerce' ),
		tax.priority,
	]
		.map( ( item ) => item.toString().toUpperCase().trim() )
		.filter( Boolean )
		.join( '-' );
}
