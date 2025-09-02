/**
 * External dependencies
 */
import { BlockAttributes } from '@finpress/blocks';

export interface NumberBlockAttributes extends BlockAttributes {
	label: string;
	property: string;
	help?: string;
	suffix?: string;
	placeholder?: string;
	min?: number;
	max?: number;
	required?: boolean;
	tooltip?: string;
	step?: number;
}
