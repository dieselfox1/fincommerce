type WPApiFetchError = {
    code: string;
    message: string;
};
type WPInternalServerError = {
    code: string;
    message: string;
    additional_errors: unknown[];
    data: {
        status: number;
    };
};
export type RestApiError = WPApiFetchError | WPInternalServerError;
export declare const isRestApiError: (error: unknown) => error is RestApiError;
export {};
//# sourceMappingURL=api.d.ts.map