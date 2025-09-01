import { Edit } from './edit';
import { SelectBlockAttributes } from './types';
declare const name: string | undefined, metadata: {
    attributes: {
        readonly [x: string]: import("@wordpress/blocks").BlockAttribute<any>;
        readonly property: import("@wordpress/blocks").BlockAttribute<string>;
        readonly label: import("@wordpress/blocks").BlockAttribute<string>;
        readonly note?: import("@wordpress/blocks").BlockAttribute<string | undefined> | undefined;
        readonly help?: import("@wordpress/blocks").BlockAttribute<string | undefined> | undefined;
        readonly tooltip?: import("@wordpress/blocks").BlockAttribute<string | undefined> | undefined;
        readonly placeholder?: import("@wordpress/blocks").BlockAttribute<string | undefined> | undefined;
        readonly disabled?: import("@wordpress/blocks").BlockAttribute<boolean | undefined> | undefined;
        readonly multiple?: import("@wordpress/blocks").BlockAttribute<boolean | undefined> | undefined;
        readonly options?: import("@wordpress/blocks").BlockAttribute<{
            label: string;
            value: string;
        }[] | undefined> | undefined;
    };
    description?: string | undefined;
    parent?: readonly string[] | undefined;
    script?: string;
    style?: string;
    title: string;
    apiVersion?: number;
    category: string;
    deprecated?: readonly import("@wordpress/blocks").BlockDeprecation<SelectBlockAttributes, Record<string, any>>[] | undefined;
    edit?: import("react").ComponentType<import("@wordpress/blocks").BlockEditProps<SelectBlockAttributes>> | undefined;
    editorScript?: string;
    editorStyle?: string;
    example?: Readonly<Partial<import("@wordpress/blocks").Block> & {
        innerBlocks?: ReadonlyArray<Partial<import("@wordpress/blocks").Block<{}>> & Pick<import("@wordpress/blocks").Block<{}>, "attributes" | "name"> & {
            innerBlocks?: ReadonlyArray<Partial<import("@wordpress/blocks").Block<{}>> & Pick<import("@wordpress/blocks").Block<{}>, "attributes" | "name"> & /*elided*/ any>;
        }>;
    }>;
    keywords?: readonly string[] | undefined;
    providesContext?: Record<string, keyof SelectBlockAttributes> | undefined;
    save?: import("react").ComponentType<import("@wordpress/blocks").BlockSaveProps<SelectBlockAttributes>> | undefined;
    styles?: readonly import("@wordpress/blocks").BlockStyle[] | undefined;
    supports?: import("@wordpress/blocks").BlockSupports | undefined;
    textdomain?: string;
    transforms?: {
        readonly from?: readonly import("@wordpress/blocks").Transform<SelectBlockAttributes>[] | undefined;
        readonly to?: readonly import("@wordpress/blocks").Transform[] | undefined;
    } | undefined;
    usesContext?: string[];
    version?: string;
    getEditWrapperProps?: ((attrs: SelectBlockAttributes) => Record<string, string | number | boolean>) | undefined;
    merge?: ((attributes: SelectBlockAttributes, attributesToMerge: SelectBlockAttributes) => Partial<SelectBlockAttributes>) | undefined;
    icon?: import("@wordpress/blocks").BlockIcon | undefined;
};
export { metadata, name };
export declare const settings: {
    example: {};
    edit: typeof Edit;
};
export declare const init: () => import("@wordpress/blocks").Block<Record<string, any>> | undefined;
//# sourceMappingURL=index.d.ts.map