import { Block } from '@wordpress/blocks/index';
/**
 * Filters registered block settings, extending attributes to include `layout`.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
export declare function addAttribute(settings: Block): Block<{}> | {
    attributes: {
        layout: {
            type: string;
        };
    };
    apiVersion?: number;
    category: string;
    deprecated?: readonly import("@wordpress/blocks").BlockDeprecation<{}, Record<string, any>>[];
    description?: string | undefined;
    edit?: import("react").ComponentType<import("@wordpress/blocks").BlockEditProps<{}>>;
    editorScript?: string;
    editorStyle?: string;
    example?: Readonly<Partial<Block> & {
        innerBlocks?: readonly (Partial<Block<{}>> & Pick<Block<{}>, "attributes" | "name"> & {
            innerBlocks?: readonly (Partial<Block<{}>> & Pick<Block<{}>, "attributes" | "name"> & /*elided*/ any)[];
        })[];
    }>;
    icon: import("@wordpress/blocks").BlockIconNormalized;
    keywords?: readonly string[] | undefined;
    parent?: readonly string[] | undefined;
    ancestor?: readonly string[] | undefined;
    providesContext?: Record<string, never>;
    name: string;
    save: import("react").ComponentType<import("@wordpress/blocks").BlockSaveProps<{}>>;
    script?: string;
    style?: string;
    styles?: readonly import("@wordpress/blocks").BlockStyle[] | undefined;
    supports?: import("@wordpress/blocks").BlockSupports | undefined;
    textdomain?: string;
    title: string;
    transforms?: {
        readonly from?: readonly import("@wordpress/blocks").Transform<{}>[];
        readonly to?: readonly import("@wordpress/blocks").Transform[] | undefined;
    };
    usesContext?: string[];
    version?: string;
    getEditWrapperProps?(attrs: {}): Record<string, string | number | boolean>;
    merge?(attributes: {}, attributesToMerge: {}): Partial<{}>;
};
/**
 * Override the default edit UI to include layout controls
 *
 * @param {Function} BlockEdit Original component.
 *
 * @return {Function} Wrapped component.
 */
export declare const withLayoutControls: (Inner: import("react").ComponentType<any>) => (props: any) => import("react/jsx-runtime").JSX.Element[];
/**
 * Override the default block element to add the layout classes.
 *
 * @param {Function} BlockListBlock Original component.
 *
 * @return {Function} Wrapped component.
 */
export declare const withLayoutStyles: (Inner: import("react").ComponentType<any>) => (props: any) => import("react/jsx-runtime").JSX.Element;
export declare function initializeLayout(): void;
