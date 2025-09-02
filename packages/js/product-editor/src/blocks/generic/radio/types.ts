/**
 * External dependencies
 */
import { BlockAttributes } from '@finpress/blocks';

export interface RadioBlockAttributes extends BlockAttributes {
	title: string;
	description: string;
	property: string;
	options: [];
	disabled?: boolean;
}
