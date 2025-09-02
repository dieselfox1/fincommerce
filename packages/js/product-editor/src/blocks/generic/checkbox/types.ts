/**
 * External dependencies
 */
import type { BlockAttributes } from '@finpress/blocks';

export interface CheckboxBlockAttributes extends BlockAttributes {
	property: string;
	title?: string;
	label?: string;
	tooltip?: string;
	checkedValue?: string | null;
	uncheckedValue?: string | null;
}
