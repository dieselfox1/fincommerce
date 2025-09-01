import { Edit } from './edit';
import { TextBlockAttributes } from './types';
declare const name: string | undefined, metadata: {
    attributes: {
        readonly [x: string]: import("@wordpress/blocks").BlockAttribute<any>;
        readonly property: import("@wordpress/blocks").BlockAttribute<string>;
        readonly label: import("@wordpress/blocks").BlockAttribute<string>;
        readonly help?: import("@wordpress/blocks").BlockAttribute<string | undefined> | undefined;
        readonly tooltip?: import("@wordpress/blocks").BlockAttribute<string | undefined> | undefined;
        readonly placeholder?: import("@wordpress/blocks").BlockAttribute<string | undefined> | undefined;
        readonly suffix?: import("@wordpress/blocks").BlockAttribute<string | boolean | undefined> | undefined;
        readonly required?: import("@wordpress/blocks").BlockAttribute<string | boolean | undefined> | undefined;
        readonly type?: import("@wordpress/blocks").BlockAttribute<{
            value?: import("react").HTMLInputTypeAttribute;
            message?: string;
        } | undefined> | undefined;
        readonly pattern?: import("@wordpress/blocks").BlockAttribute<{
            value: string;
            message?: string;
        } | undefined> | undefined;
        readonly minLength?: import("@wordpress/blocks").BlockAttribute<{
            value: number;
            message?: string;
        } | undefined> | undefined;
        readonly maxLength?: import("@wordpress/blocks").BlockAttribute<{
            value: number;
            message?: string;
        } | undefined> | undefined;
        readonly min?: import("@wordpress/blocks").BlockAttribute<{
            value: number;
            message?: string;
        } | undefined> | undefined;
        readonly max?: import("@wordpress/blocks").BlockAttribute<{
            value: number;
            message?: string;
        } | undefined> | undefined;
    };
    description?: string | undefined;
    parent?: readonly string[] | undefined;
    script?: string;
    style?: string;
    title: string;
    apiVersion?: number;
    category: string;
    deprecated?: readonly import("@wordpress/blocks").BlockDeprecation<TextBlockAttributes, Record<string, any>>[] | undefined;
    edit?: import("react").ComponentType<import("@wordpress/blocks").BlockEditProps<TextBlockAttributes>> | undefined;
    editorScript?: string;
    editorStyle?: string;
    example?: Readonly<Partial<import("@wordpress/blocks").Block> & {
        innerBlocks?: ReadonlyArray<Partial<import("@wordpress/blocks").Block<{}>> & Pick<import("@wordpress/blocks").Block<{}>, "attributes" | "name"> & {
            innerBlocks?: ReadonlyArray<Partial<import("@wordpress/blocks").Block<{}>> & Pick<import("@wordpress/blocks").Block<{}>, "attributes" | "name"> & /*elided*/ any>;
        }>;
    }>;
    keywords?: readonly string[] | undefined;
    providesContext?: Record<string, keyof TextBlockAttributes> | undefined;
    save?: import("react").ComponentType<import("@wordpress/blocks").BlockSaveProps<TextBlockAttributes>> | undefined;
    styles?: readonly import("@wordpress/blocks").BlockStyle[] | undefined;
    supports?: import("@wordpress/blocks").BlockSupports | undefined;
    textdomain?: string;
    transforms?: {
        readonly from?: readonly import("@wordpress/blocks").Transform<TextBlockAttributes>[] | undefined;
        readonly to?: readonly import("@wordpress/blocks").Transform[] | undefined;
    } | undefined;
    usesContext?: string[];
    version?: string;
    getEditWrapperProps?: ((attrs: TextBlockAttributes) => Record<string, string | number | boolean>) | undefined;
    merge?: ((attributes: TextBlockAttributes, attributesToMerge: TextBlockAttributes) => Partial<TextBlockAttributes>) | undefined;
    icon?: import("@wordpress/blocks").BlockIcon | undefined;
};
export { metadata, name };
export declare const settings: {
    example: {};
    edit: typeof Edit;
};
export declare const init: () => import("@wordpress/blocks").Block<Record<string, any>> | undefined;
//# sourceMappingURL=index.d.ts.map