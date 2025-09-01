export declare const batchFetch: (optionName: string) => {
    type: string;
    optionName: string;
};
export declare const controls: {
    BATCH_FETCH({ optionName }: {
        optionName: string;
    }): Promise<unknown>;
    AWAIT_PROMISE: <T>({ promise }: {
        promise: Promise<T>;
    }) => Promise<T>;
    API_FETCH({ request }: {
        request: import("@wordpress/api-fetch").APIFetchOptions;
    }): Promise<unknown>;
};
//# sourceMappingURL=controls.d.ts.map