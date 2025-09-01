/**
 * External dependencies
 */
import { Block, BlockConfiguration } from '@wordpress/blocks';
type SelectType = (store: string) => Record<string, unknown>;
interface BlockRepresentation<T extends Record<string, object>> {
    name?: string;
    metadata: BlockConfiguration<T>;
    settings: Partial<BlockConfiguration<T>>;
}
type UseEvaluationContext = (context: Record<string, unknown>) => {
    getEvaluationContext: (select: SelectType) => Record<string, unknown>;
};
/**
 * Function to register an individual block.
 *
 * @param block The block to be registered.
 * @return The block, if it has been successfully registered; otherwise `undefined`.
 */
export declare function registerWooBlockType<T extends Record<string, any> = Record<string, any>>(block: BlockRepresentation<T>, useEvaluationContext?: UseEvaluationContext): Block<T> | undefined;
export {};
//# sourceMappingURL=register-woo-block-type.d.ts.map