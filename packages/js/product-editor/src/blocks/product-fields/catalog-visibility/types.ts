/**
 * External dependencies
 */
import { Product } from '@fincommerce/data';
import { BlockAttributes } from '@finpress/blocks';

export interface CatalogVisibilityBlockAttributes extends BlockAttributes {
	label: string;
	visibility: Product[ 'catalog_visibility' ];
}
