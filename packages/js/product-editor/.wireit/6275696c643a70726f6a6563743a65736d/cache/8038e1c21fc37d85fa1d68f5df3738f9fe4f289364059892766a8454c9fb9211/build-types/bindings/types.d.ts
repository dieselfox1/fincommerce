/**
 * External dependencies
 */
import type { BlockEditProps, BlockAttributes } from '@wordpress/blocks';
export type AttributeBindingProps = {
    source: string;
    args: {
        prop: string;
    };
};
export type MetadataBindingsProps = Record<string, AttributeBindingProps>;
export type BoundBlockAttributes = BlockAttributes & {
    metadata?: {
        bindings: MetadataBindingsProps;
    };
};
export type BoundBlockEditInstance = CoreBlockEditProps<BoundBlockAttributes>;
export type BoundBlockEditComponent = React.ComponentType<BoundBlockEditInstance>;
export type BindingUseSourceProps = {
    placeholder: string | null;
    value: any;
    updateValue: (newValue: any) => void;
};
export interface BindingSourceHandlerProps<T> {
    name: string;
    label: string;
    useSource: (blockProps: CoreBlockEditProps<BlockAttributes>, sourceArgs: T) => BindingUseSourceProps;
    lockAttributesEditing: boolean;
}
export interface CoreBlockEditProps<T extends Record<string, any>> extends BlockEditProps<T> {
    readonly name: string;
    readonly context: Record<string, string>;
}
export type BlockProps = CoreBlockEditProps<BlockAttributes>;
//# sourceMappingURL=types.d.ts.map