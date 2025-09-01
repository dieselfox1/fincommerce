export type WPErrorCode = 'variable_product_no_variation_prices' | 'product_form_field_error' | 'product_invalid_sku' | 'product_invalid_global_unique_id' | 'product_create_error' | 'product_publish_error' | 'product_preview_error';
export type WPError = {
    code: WPErrorCode;
    message: string;
    validatorId?: string;
};
type ErrorProps = {
    explicitDismiss: boolean;
    actions?: ErrorAction[];
};
type ErrorAction = {
    label: string;
    onClick: () => void;
};
type UseErrorHandlerTypes = {
    getProductErrorMessageAndProps: (error: WPError, visibleTab: string | null) => Promise<{
        message: string;
        errorProps: ErrorProps;
    }>;
};
export declare const useErrorHandler: () => UseErrorHandlerTypes;
export {};
//# sourceMappingURL=use-error-handler.d.ts.map