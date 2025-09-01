/**
 * External dependencies
 */
import { BlockInstance } from '@wordpress/blocks';
/**
 * By default the blocks returned by the editor contains one paragraph
 * block with empty content. This function checks to see if the blocks
 * consists of a single paragraph block with empty content or no blocks.
 *
 * @param blocks The block list
 * @return true if the blocks consists of a single paragraph block with empty content or no blocks; false otherwise
 */
export declare function areBlocksEmpty(blocks?: BlockInstance[] | null): boolean;
//# sourceMappingURL=are-blocks-empty.d.ts.map