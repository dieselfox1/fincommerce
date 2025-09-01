/**
 * External dependencies
 */
import { FontSize } from '@wordpress/components/build-types/font-size-picker/types';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { store as keyboardShortutsStore } from '@wordpress/keyboard-shortcuts';
import { store as preferencesStore } from '@wordpress/preferences';
import { store as noticesStore } from '@wordpress/notices';
import { ActionCreatorsOf, ConfigOf, CurriedSelectorsOf, DataRegistry, StoreDescriptor as GenericStoreDescriptor, UseSelectReturn } from '@wordpress/data/build-types/types';
import { Color, Gradient } from '@wordpress/components/build-types/palette-edit/types';
/**
 * Internal dependencies
 */
import './wordpress-modules';
export type FontFamily = {
    name: string;
    slug: string;
    fontFamily: string;
};
declare module '@wordpress/data' {
    interface StoreMap {
        [key: string]: StoreDescriptor;
    }
    type TKey = keyof StoreMap;
    type TStore<T> = T extends keyof StoreMap ? StoreMap[T] : never;
    type SpecialStoreName = 'core/block-editor' | 'core/editor' | 'core/notices';
    type TSelectors<T> = T extends SpecialStoreName ? ConfigOf<TStore<T>>['selectors'] : CurriedSelectorsOf<TStore<T>>;
    type TActions<T> = ActionCreatorsOf<ConfigOf<TStore<T>>>;
    type TSelectFunction = <T extends TKey | StoreDescriptor>(store: T) => T extends TKey ? TSelectors<T> : T extends {
        name: SpecialStoreName;
    } ? ConfigOf<T>['selectors'] : CurriedSelectorsOf<T>;
    type TMapSelect = (select: TSelectFunction, registry: DataRegistry) => any;
    function select<T extends string>(store: T): TSelectors<T>;
    function select<T extends GenericStoreDescriptor<any>>(store: T): T extends {
        name: SpecialStoreName;
    } ? ConfigOf<T>['selectors'] : CurriedSelectorsOf<T>;
    function dispatch<T extends string>(store: T): TActions<T>;
    function dispatch<T extends GenericStoreDescriptor<any>>(store: T): ActionCreatorsOf<ConfigOf<T>>;
    function useRegistry(): {
        batch: (callback: () => void) => void;
    };
    function useSelect<T extends TMapSelect>(mapSelect: T, deps?: unknown[]): ReturnType<T>;
    function useSelect<T extends StoreDescriptor>(store: T, deps?: unknown[]): UseSelectReturn<T>;
    function useSelect<T extends string>(store: T, deps?: unknown[]): UseSelectReturn<TStore<T>>;
    function useDispatch<T extends string>(store: T): TActions<T>;
    function createRegistrySelector<S extends typeof select, T extends (state: any, ...args: any) => any>(registrySelector: (select: S) => T): T;
    interface StoreMap {
        [blockEditorStore.name]: typeof blockEditorStore;
        [keyboardShortutsStore.name]: typeof keyboardShortutsStore;
        [preferencesStore.name]: typeof preferencesStore;
        [noticesStore.name]: typeof noticesStore;
    }
}
declare module '@wordpress/block-editor' {
    const __experimentalLibrary: any;
    const __experimentalListView: any;
    function useSettings(path: string): unknown;
    function useSettings(path1: 'typography.fontSizes', path2: 'typography.fontFamilies'): [FontSize[], {
        default: FontFamily[];
    }];
    function useSettings(path1: 'color.palette', path2: 'color.gradients'): [Color[], Gradient[]];
    function useSettings(path: 'typography.fontSizes'): [FontSize[]];
    interface EditorSettings {
        gradients: {
            name: string;
            slug: string;
            gradient: string;
        }[];
    }
}
