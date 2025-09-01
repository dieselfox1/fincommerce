type EditorContextType = {
    hasRedo: boolean;
    hasUndo: boolean;
    isDocumentOverviewOpened: boolean;
    isInserterOpened: boolean;
    redo: () => void;
    setIsDocumentOverviewOpened: (value: boolean) => void;
    setIsInserterOpened: (value: boolean) => void;
    undo: () => void;
};
export declare const EditorContext: import("react").Context<EditorContextType>;
export {};
//# sourceMappingURL=context.d.ts.map