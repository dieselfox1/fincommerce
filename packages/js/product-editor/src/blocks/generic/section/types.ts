/**
 * External dependencies
 */
import { BlockAttributes } from '@finpress/blocks';

export interface SectionBlockAttributes extends BlockAttributes {
	title?: string;
	description?: string;
	blockGap: 'lg' | '2xlg';
}
