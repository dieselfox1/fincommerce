/**
 * External dependencies
 */
import { BlockAttributes } from '@finpress/blocks';

export interface SalePriceBlockAttributes extends BlockAttributes {
	label: string;
	help?: string;
	disabled?: boolean;
}
