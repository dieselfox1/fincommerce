export declare const wooProductEditorUiStore: import("@wordpress/data/build-types/types").StoreDescriptor<import("@wordpress/data/build-types/types").ReduxStoreConfig<unknown, {
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
    setModalEditorBlocks: (blocks: import("@wordpress/blocks").BlockInstance[]) => {
        type: string;
        blocks: import("@wordpress/blocks").BlockInstance<{
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
}, {
    isModalEditorOpen: (state: import("./types").ProductEditorUIStateProps) => boolean | undefined;
    getModalEditorBlocks: (state: import("./types").ProductEditorUIStateProps) => import("@wordpress/blocks").BlockInstance[];
    getModalEditorContentHasChanged: (state: import("./types").ProductEditorUIStateProps) => boolean;
    isPrepublishPanelOpen: (state: import("./types").ProductEditorUIStateProps) => boolean | undefined;
}>>;
export default function registerProductEditorUiStore(): void;
//# sourceMappingURL=index.d.ts.map