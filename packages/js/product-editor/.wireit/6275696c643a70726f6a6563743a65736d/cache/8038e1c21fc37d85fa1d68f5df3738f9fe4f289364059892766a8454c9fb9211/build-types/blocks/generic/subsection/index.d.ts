import { SubsectionBlockEdit } from './edit';
declare const name: string, metadata: {
    $schema: string;
    apiVersion: number;
    title: string;
    category: string;
    description: string;
    keywords: string[];
    textdomain: string;
    attributes: {
        title: {
            type: string;
        };
        description: {
            type: string;
            role: string;
        };
        blockGap: {
            type: string;
            enum: string[];
            default: string;
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
};
export { metadata, name };
export declare const settings: {
    example: {};
    edit: typeof SubsectionBlockEdit;
};
export declare function init(): import("@wordpress/blocks").Block<Record<string, any>> | undefined;
//# sourceMappingURL=index.d.ts.map