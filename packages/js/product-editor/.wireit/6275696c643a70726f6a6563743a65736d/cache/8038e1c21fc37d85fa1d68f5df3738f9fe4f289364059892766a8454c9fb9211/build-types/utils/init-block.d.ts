/**
 * External dependencies
 */
import { Block, BlockConfiguration } from '@wordpress/blocks';
interface BlockRepresentation<T extends Record<string, object>> {
    name?: string;
    metadata: BlockConfiguration<T>;
    settings: Partial<BlockConfiguration<T>>;
}
/**
 * Function to register an individual block.
 *
 * @param block The block to be registered.
 * @return The block, if it has been successfully registered; otherwise `undefined`.
 */
export declare function initBlock<T extends Record<string, any> = Record<string, any>>(block: BlockRepresentation<T>): Block<T> | undefined;
export {};
//# sourceMappingURL=init-block.d.ts.map