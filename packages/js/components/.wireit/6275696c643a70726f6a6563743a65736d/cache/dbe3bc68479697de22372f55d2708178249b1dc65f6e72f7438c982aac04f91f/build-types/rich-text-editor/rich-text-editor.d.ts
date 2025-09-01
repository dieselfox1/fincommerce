import { BlockInstance } from '@wordpress/blocks';
type RichTextEditorProps = {
    blocks: BlockInstance[];
    label?: string;
    onChange: (changes: BlockInstance[]) => void;
    entryId?: string;
    placeholder?: string;
};
export declare const RichTextEditor: React.VFC<RichTextEditorProps>;
export {};
//# sourceMappingURL=rich-text-editor.d.ts.map