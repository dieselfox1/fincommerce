/**
 * External dependencies
 */
import { BlockAttributes } from '@finpress/blocks';

export interface PricingBlockAttributes extends BlockAttributes {
	property: string;
	label: string;
	help?: string;
	tooltip?: string;
}
