/**
 * External dependencies
 */
import { BlockAttributes } from '@finpress/blocks';

export interface ToggleBlockAttributes extends BlockAttributes {
	label: string;
	property: string;
	disabled?: boolean;
	checkedValue?: never;
	uncheckedValue?: never;
}
