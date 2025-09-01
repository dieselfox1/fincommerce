/**
 * External dependencies
 */
import { BlockInstance } from '@wordpress/blocks';
import { EditorSettings, EditorBlockListSettings } from '@wordpress/block-editor';
type IframeEditorProps = {
    initialBlocks?: BlockInstance[];
    onChange?: (blocks: BlockInstance[]) => void;
    onClose?: () => void;
    onInput?: (blocks: BlockInstance[]) => void;
    settings?: Partial<EditorSettings & EditorBlockListSettings> | undefined;
    showBackButton?: boolean;
    name: string;
};
export declare function IframeEditor({ onChange, onClose, onInput, settings: __settings, showBackButton, name, }: IframeEditorProps): JSX.Element;
export {};
//# sourceMappingURL=iframe-editor.d.ts.map