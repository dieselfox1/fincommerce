import { SummaryBlockEdit } from './edit';
declare const name: string, metadata: {
    $schema: string;
    apiVersion: number;
    title: string;
    category: string;
    description: string;
    keywords: string[];
    textdomain: string;
    attributes: {
        property: {
            type: string;
        };
        align: {
            type: string;
        };
        allowedFormats: {
            type: string;
            default: string[];
        };
        direction: {
            type: string;
            enum: string[];
        };
        label: {
            type: string;
        };
        helpText: {
            type: string;
        };
        content: {
            type: string;
            role: string;
        };
    };
    supports: {
        align: boolean;
        html: boolean;
        multiple: boolean;
        reusable: boolean;
        inserter: boolean;
        lock: boolean;
    };
    editorStyle: string;
    usesContext: string[];
};
export { name, metadata };
export declare const settings: {
    example: {};
    edit: typeof SummaryBlockEdit;
};
export declare function init(): import("@wordpress/blocks").Block<Record<string, any>> | undefined;
//# sourceMappingURL=index.d.ts.map