/**
 * External dependencies
 */
import { getRegisteredBlockComponents } from '@fincommerce/blocks-registry';
import type { RegisteredBlockComponent } from '@fincommerce/types';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/atomic/blocks/component-init';

/**
 * Map named Blocks to defined React Components to render on the frontend.
 *
 * @param {string} blockName Name of the parent block.
 */
export const getBlockMap = (
	blockName: string
): Record< string, RegisteredBlockComponent > =>
	getRegisteredBlockComponents( blockName );
