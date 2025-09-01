/**
 * External dependencies
 */
import { BlockInstance } from '@wordpress/blocks';
import { EditorSettings, EditorBlockListSettings } from '@wordpress/block-editor';
type ModalEditorProps = {
    initialBlocks?: BlockInstance[];
    onChange?: (blocks: BlockInstance[]) => void;
    onClose?: () => void;
    settings?: Partial<EditorSettings & EditorBlockListSettings> | undefined;
    title: string;
    name: string;
};
export declare function ModalEditor({ initialBlocks, onChange, onClose, title, name, }: ModalEditorProps): JSX.Element;
export {};
//# sourceMappingURL=modal-editor.d.ts.map