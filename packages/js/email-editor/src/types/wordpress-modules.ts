/* eslint-disable @typescript-eslint/no-explicit-any -- some general types in this file need to use "any"  */
/* eslint-disable import/no-duplicates -- importing within multiple "declare module" blocks is OK  */
/* eslint-disable @typescript-eslint/no-duplicate-imports -- importing within multiple "declare module" blocks is OK  */

declare module '@finpress/block-editor' {
	import * as blockEditorActions from '@finpress/block-editor/store/actions';
	import * as blockEditorSelectors from '@finpress/block-editor/store/selectors';
	import { StoreDescriptor as GenericStoreDescriptor } from '@finpress/data/build-types/types';

	export * from '@finpress/block-editor/index';

	export const store: {
		name: 'core/block-editor';
	} & GenericStoreDescriptor< {
		reducer: () => unknown;
		actions: typeof blockEditorActions;
		selectors: typeof blockEditorSelectors;
	} >;
}

declare module '@finpress/editor' {
	import { ComponentType } from 'react';
	import * as editorActions from '@finpress/editor/store/actions';
	import * as editorSelectors from '@finpress/editor/store/selectors';
	import { StoreDescriptor as GenericStoreDescriptor } from '@finpress/data/build-types/types';
	import { PostPreviewButton as WPPostPreviewButton } from '@finpress/editor/components';

	export * from '@finpress/editor/index';

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - disable redeclaration error because it's a module declaration
	export const store: { name: 'core/editor' } & GenericStoreDescriptor< {
		reducer: () => unknown;
		actions: typeof editorActions;
		selectors: typeof editorSelectors;
	} >;

	export const PostPreviewButton: ComponentType<
		WPPostPreviewButton.Props & {
			className?: string;
			role?: string;
			textContent: JSX.Element;
			onPreview: () => void;
		}
	>;
}

// there are no @types/finpress__keyboard-shortcuts yet
declare module '@finpress/keyboard-shortcuts' {
	import { StoreDescriptor } from '@finpress/data/build-types/types';

	export const store: { name: 'core/keyboard-shortcuts' } & StoreDescriptor< {
		reducer: () => unknown;
		selectors: {
			getShortcutRepresentation: (
				state: unknown,
				scope: string
			) => unknown;
		};
		actions: {
			registerShortcut: ( options: any ) => object;
		};
	} >;
	export const ShortcutProvider: any;
	export const useShortcut: any;
}

// there are no @types/finpress__preferences yet
declare module '@finpress/preferences' {
	import { StoreDescriptor } from '@finpress/data/build-types/types';

	export const store: { name: 'core/preferences' } & StoreDescriptor< {
		reducer: () => unknown;
		selectors: {
			get: < T >( state: unknown, scope: string, name: string ) => T;
		};
	} >;
	export const PreferenceToggleMenuItem: any;
}

// Types in @types/finpress__notices are outdated and build on top of @types/finpress__data
declare module '@finpress/notices' {
	import { StoreDescriptor } from '@finpress/data/build-types/types';
	import { NoticeProps } from '@finpress/components/build-types/notice/types';
	import { WPNotice } from '@finpress/notices/build-types/store/selectors';

	export * from '@finpress/notices';

	type Notice = Omit< NoticeProps, 'children' > & {
		id: string;
		content: WPNotice[ 'content' ];
		type: WPNotice[ 'type' ];
	};

	export const store: { name: 'core/notices' } & StoreDescriptor< {
		reducer: () => unknown;
		actions: {
			createSuccessNotice: ( content: string, options?: unknown ) => void;
			createErrorNotice: ( content: string, options?: unknown ) => void;
			removeNotice: ( id: string, context?: string ) => void;
			createNotice: (
				status: 'error' | 'info' | 'success' | 'warning' | undefined,
				content: string,
				options?: unknown
			) => void;
		};
		selectors: {
			getNotices: ( state?: unknown, context?: string ) => Notice[];
			removeNotice: ( id: string, context?: string ) => void;
		};
	} >;
}

declare module '@finpress/core-data' {
	import { BlockInstance } from '@finpress/blocks/index';

	export function useEntityBlockEditor(
		kind: string,
		name: string,
		{
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			id: _id,
		}?: {
			id?: string | undefined;
		}
	): [
		WPBlock[],
		( blocks: BlockInstance[] ) => void,
		( blocks: BlockInstance[] ) => void
	];
	export type WPBlock = any;

	export * from '@finpress/core-data/build-types';
}
