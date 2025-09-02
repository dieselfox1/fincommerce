/**
 * External dependencies
 */
import { BlockAttributes } from '@finpress/blocks';

export interface SubsectionBlockAttributes extends BlockAttributes {
	title?: string;
	description?: string;
	blockGap: 'lg' | '2xlg';
}
