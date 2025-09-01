import { BlockInstance } from '@wordpress/blocks';
import type { DescriptionBlockEditComponent } from './types';
/**
 * Check whether the parsed blocks become from the summary block.
 *
 * @param {BlockInstance[]} blocks - The block list
 * @return {string|false} The content of the freeform block if it's a freeform block, false otherwise.
 */
export declare function getContentFromFreeform(blocks: BlockInstance[]): false | string;
export declare function DescriptionBlockEdit({ attributes, }: DescriptionBlockEditComponent): JSX.Element;
//# sourceMappingURL=edit.d.ts.map