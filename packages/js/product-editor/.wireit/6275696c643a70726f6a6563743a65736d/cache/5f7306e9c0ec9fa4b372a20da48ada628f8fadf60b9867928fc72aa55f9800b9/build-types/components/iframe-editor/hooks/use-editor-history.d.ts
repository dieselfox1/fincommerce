/**
 * External dependencies
 */
import { BlockInstance } from '@wordpress/blocks';
type useEditorHistoryProps = {
    maxHistory?: number;
    setBlocks: (blocks: BlockInstance[]) => void;
};
export declare function useEditorHistory({ maxHistory, setBlocks, }: useEditorHistoryProps): {
    appendEdit: import("@wordpress/compose").DebouncedFunc<(edit: BlockInstance[]) => void>;
    hasRedo: boolean;
    hasUndo: boolean;
    redo: () => void;
    undo: () => void;
};
export {};
//# sourceMappingURL=use-editor-history.d.ts.map