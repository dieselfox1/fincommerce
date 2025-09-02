/**
 * External dependencies
 */
import { BlockInstance } from '@finpress/blocks';

export type Pattern = {
	blockTypes: string[];
	categories: string[];
	content: string;
	name: string;
	source: string;
	title: string;
};

export type PatternWithBlocks = Pattern & {
	blocks: BlockInstance[];
};
