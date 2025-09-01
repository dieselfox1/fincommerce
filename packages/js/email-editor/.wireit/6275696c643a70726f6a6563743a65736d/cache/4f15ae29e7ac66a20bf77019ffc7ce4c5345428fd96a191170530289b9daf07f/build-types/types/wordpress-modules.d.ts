declare module '@wordpress/block-editor' {
    import * as blockEditorActions from '@wordpress/block-editor/store/actions';
    import * as blockEditorSelectors from '@wordpress/block-editor/store/selectors';
    import { StoreDescriptor as GenericStoreDescriptor } from '@wordpress/data/build-types/types';
    export * from '@wordpress/block-editor/index';
    export const store: {
        name: 'core/block-editor';
    } & GenericStoreDescriptor<{
        reducer: () => unknown;
        actions: typeof blockEditorActions;
        selectors: typeof blockEditorSelectors;
    }>;
}
declare module '@wordpress/editor' {
    import { ComponentType } from 'react';
    import * as editorActions from '@wordpress/editor/store/actions';
    import * as editorSelectors from '@wordpress/editor/store/selectors';
    import { StoreDescriptor as GenericStoreDescriptor } from '@wordpress/data/build-types/types';
    import { PostPreviewButton as WPPostPreviewButton } from '@wordpress/editor/components';
    export * from '@wordpress/editor/index';
    export const store: {
        name: 'core/editor';
    } & GenericStoreDescriptor<{
        reducer: () => unknown;
        actions: typeof editorActions;
        selectors: typeof editorSelectors;
    }>;
    export const PostPreviewButton: ComponentType<WPPostPreviewButton.Props & {
        className?: string;
        role?: string;
        textContent: JSX.Element;
        onPreview: () => void;
    }>;
}
declare module '@wordpress/keyboard-shortcuts' {
    import { StoreDescriptor } from '@wordpress/data/build-types/types';
    const store: {
        name: 'core/keyboard-shortcuts';
    } & StoreDescriptor<{
        reducer: () => unknown;
        selectors: {
            getShortcutRepresentation: (state: unknown, scope: string) => unknown;
        };
        actions: {
            registerShortcut: (options: any) => object;
        };
    }>;
    const ShortcutProvider: any;
    const useShortcut: any;
}
declare module '@wordpress/preferences' {
    import { StoreDescriptor } from '@wordpress/data/build-types/types';
    const store: {
        name: 'core/preferences';
    } & StoreDescriptor<{
        reducer: () => unknown;
        selectors: {
            get: <T>(state: unknown, scope: string, name: string) => T;
        };
    }>;
    const PreferenceToggleMenuItem: any;
}
declare module '@wordpress/notices' {
    import { StoreDescriptor } from '@wordpress/data/build-types/types';
    import { NoticeProps } from '@wordpress/components/build-types/notice/types';
    import { WPNotice } from '@wordpress/notices/build-types/store/selectors';
    export * from '@wordpress/notices';
    type Notice = Omit<NoticeProps, 'children'> & {
        id: string;
        content: WPNotice['content'];
        type: WPNotice['type'];
    };
    export const store: {
        name: 'core/notices';
    } & StoreDescriptor<{
        reducer: () => unknown;
        actions: {
            createSuccessNotice: (content: string, options?: unknown) => void;
            createErrorNotice: (content: string, options?: unknown) => void;
            removeNotice: (id: string, context?: string) => void;
            createNotice: (status: 'error' | 'info' | 'success' | 'warning' | undefined, content: string, options?: unknown) => void;
        };
        selectors: {
            getNotices: (state?: unknown, context?: string) => Notice[];
            removeNotice: (id: string, context?: string) => void;
        };
    }>;
}
declare module '@wordpress/core-data' {
    import { BlockInstance } from '@wordpress/blocks/index';
    export function useEntityBlockEditor(kind: string, name: string, { id: _id, }?: {
        id?: string | undefined;
    }): [
        WPBlock[],
        (blocks: BlockInstance[]) => void,
        (blocks: BlockInstance[]) => void
    ];
    export type WPBlock = any;
    export * from '@wordpress/core-data/build-types';
}
