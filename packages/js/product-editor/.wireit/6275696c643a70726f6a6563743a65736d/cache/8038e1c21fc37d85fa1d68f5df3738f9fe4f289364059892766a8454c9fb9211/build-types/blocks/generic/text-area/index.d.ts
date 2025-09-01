import { TextAreaBlockEdit } from './edit';
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
        label: {
            type: string;
            role: string;
        };
        placeholder: {
            type: string;
        };
        help: {
            type: string;
        };
        required: {
            type: string;
        };
        tooltip: {
            type: string;
        };
        disabled: {
            type: string;
        };
        align: {
            type: string;
            enum: string[];
        };
        mode: {
            type: string;
            enum: string[];
            default: string;
        };
        allowedFormats: {
            type: string;
            default: string[];
        };
        direction: {
            type: string;
            enum: string[];
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
    edit: typeof TextAreaBlockEdit;
    icon: import("react").JSX.Element;
};
export declare const init: () => import("@wordpress/blocks").Block<Record<string, any>> | undefined;
//# sourceMappingURL=index.d.ts.map