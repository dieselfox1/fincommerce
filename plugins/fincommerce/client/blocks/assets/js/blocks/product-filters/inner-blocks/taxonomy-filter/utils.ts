/**
 * External dependencies
 */
import { getSetting } from '@fincommerce/settings';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import type { TaxonomyItem } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/taxonomy-filter/types';

const taxonomies = getSetting< TaxonomyItem[] >(
	'filterableProductTaxonomies',
	[]
);

export function getTaxonomyLabel( taxonomy: string ) {
	const match = taxonomies.find( ( item ) => item.name === taxonomy );
	if ( match ) {
		return match.label;
	}
	return __( 'Taxonomy', 'fincommerce' );
}
