/**
 * External dependencies
 */
import { BlockInstance } from '@wordpress/blocks';
declare const _default: {
    openPrepublishPanel: () => {
        type: string;
    };
    closePrepublishPanel: () => {
        type: string;
    };
    openModalEditor: () => {
        type: string;
    };
    closeModalEditor: () => {
        type: string;
    };
    setModalEditorBlocks: (blocks: BlockInstance[]) => {
        type: string;
        blocks: BlockInstance<{
            [k: string]: any;
        }>[];
    };
    setModalEditorContentHasChanged: (hasChanged: boolean) => {
        type: string;
        hasChanged: boolean;
    };
    isModalEditorOpen: () => {
        type: BooleanConstructor;
    };
};
export default _default;
//# sourceMappingURL=actions.d.ts.map