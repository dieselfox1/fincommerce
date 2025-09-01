/**
 * External dependencies
 */
import { Block, BlockConfiguration } from '@wordpress/blocks';
interface BlockRepresentation<T extends Record<string, object>> {
    name?: string;
    metadata: BlockConfiguration<T>;
    settings: Partial<BlockConfiguration<T>>;
}
type SelectType = (store: string) => Record<string, unknown>;
export declare function useEvaluationContext(context: Record<string, unknown>): {
    getEvaluationContext: (select: SelectType) => {
        editedProduct: Record<string, unknown>;
    };
};
export declare function registerProductEditorBlockType<T extends Record<string, any> = Record<string, any>>(block: BlockRepresentation<T>): Block<T> | undefined;
export {};
//# sourceMappingURL=register-product-editor-block-type.d.ts.map