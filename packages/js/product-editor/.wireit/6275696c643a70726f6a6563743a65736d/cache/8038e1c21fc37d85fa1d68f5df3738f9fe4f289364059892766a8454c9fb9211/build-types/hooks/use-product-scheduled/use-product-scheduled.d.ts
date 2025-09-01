export declare const TIMEZONELESS_FORMAT = "Y-m-d\\TH:i:s";
export declare function useProductScheduled(postType: string): {
    isScheduling: boolean;
    isScheduled: boolean;
    date: string;
    formattedDate: string;
    setDate: (value?: string) => Promise<void>;
    schedule: (value?: string) => Promise<import("@fincommerce/data").Product>;
};
//# sourceMappingURL=use-product-scheduled.d.ts.map