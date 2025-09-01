import { EditorSettings, EditorBlockListSettings } from '@wordpress/block-editor';
type EditorCanvasProps = {
    children: React.ReactNode;
    enableResizing: boolean;
    settings: Partial<EditorSettings & EditorBlockListSettings> | undefined;
};
export declare function EditorCanvas({ children, enableResizing, settings, ...props }: EditorCanvasProps): JSX.Element;
export {};
//# sourceMappingURL=editor-canvas.d.ts.map