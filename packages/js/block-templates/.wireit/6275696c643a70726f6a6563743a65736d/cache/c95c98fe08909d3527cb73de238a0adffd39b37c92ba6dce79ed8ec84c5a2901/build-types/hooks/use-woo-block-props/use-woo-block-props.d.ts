interface TemplateBlockAttributes {
    _templateBlockId?: string;
    _templateBlockOrder?: number;
    [key: string]: any;
}
export declare const useWooBlockProps: (attributes: TemplateBlockAttributes, props?: Record<string, unknown>) => Omit<{
    'data-template-block-id': string | undefined;
    'data-template-block-order': number | undefined;
    tabIndex: number;
}, "ref"> & import("@wordpress/block-editor/components/use-block-props").Merged & import("@wordpress/block-editor/components/use-block-props").Reserved;
export {};
//# sourceMappingURL=use-woo-block-props.d.ts.map