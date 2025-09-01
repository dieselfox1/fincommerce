import { Edit } from './edit';
declare const name: string, metadata: {
    $schema: string;
    apiVersion: number;
    description: string;
    title: string;
    category: string;
    keywords: string[];
    textdomain: string;
    attributes: {
        label: {
            type: string;
            role: string;
        };
        help: {
            type: string;
        };
        tooltip: {
            type: string;
        };
        disabled: {
            type: string;
            default: boolean;
        };
    };
    supports: {
        align: boolean;
        html: boolean;
        multiple: boolean;
        reusable: boolean;
        inserter: boolean;
        lock: boolean;
        __experimentalToolbar: boolean;
    };
    usesContext: string[];
    editorStyle: string;
};
export { metadata, name };
export declare const settings: {
    example: {};
    edit: typeof Edit;
};
export declare function init(): import("@wordpress/blocks").Block<Record<string, any>> | undefined;
//# sourceMappingURL=index.d.ts.map