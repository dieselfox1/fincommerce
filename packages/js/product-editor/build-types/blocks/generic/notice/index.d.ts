import { Edit } from './edit';
import { NoticeBlockAttributes } from './types';
declare const name: string | undefined, metadata: {
    attributes: {
        readonly [x: string]: import("@wordpress/blocks").BlockAttribute<any>;
        readonly message: import("@wordpress/blocks").BlockAttribute<string>;
    };
    description?: string | undefined;
    parent?: readonly string[] | undefined;
    script?: string;
    style?: string;
    title: string;
    apiVersion?: number;
    category: string;
    deprecated?: readonly import("@wordpress/blocks").BlockDeprecation<NoticeBlockAttributes, Record<string, any>>[] | undefined;
    edit?: import("react").ComponentType<import("@wordpress/blocks").BlockEditProps<NoticeBlockAttributes>> | undefined;
    editorScript?: string;
    editorStyle?: string;
    example?: Readonly<Partial<import("@wordpress/blocks").Block> & {
        innerBlocks?: ReadonlyArray<Partial<import("@wordpress/blocks").Block<{}>> & Pick<import("@wordpress/blocks").Block<{}>, "attributes" | "name"> & {
            innerBlocks?: ReadonlyArray<Partial<import("@wordpress/blocks").Block<{}>> & Pick<import("@wordpress/blocks").Block<{}>, "attributes" | "name"> & /*elided*/ any>;
        }>;
    }>;
    keywords?: readonly string[] | undefined;
    providesContext?: Record<string, keyof NoticeBlockAttributes> | undefined;
    save?: import("react").ComponentType<import("@wordpress/blocks").BlockSaveProps<NoticeBlockAttributes>> | undefined;
    styles?: readonly import("@wordpress/blocks").BlockStyle[] | undefined;
    supports?: import("@wordpress/blocks").BlockSupports | undefined;
    textdomain?: string;
    transforms?: {
        readonly from?: readonly import("@wordpress/blocks").Transform<NoticeBlockAttributes>[] | undefined;
        readonly to?: readonly import("@wordpress/blocks").Transform[] | undefined;
    } | undefined;
    usesContext?: string[];
    version?: string;
    getEditWrapperProps?: ((attrs: NoticeBlockAttributes) => Record<string, string | number | boolean>) | undefined;
    merge?: ((attributes: NoticeBlockAttributes, attributesToMerge: NoticeBlockAttributes) => Partial<NoticeBlockAttributes>) | undefined;
    icon?: import("@wordpress/blocks").BlockIcon | undefined;
};
export { metadata, name };
export declare const settings: {
    example: {};
    edit: typeof Edit;
};
export declare const init: () => import("@wordpress/blocks").Block<Record<string, any>> | undefined;
//# sourceMappingURL=index.d.ts.map