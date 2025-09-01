import { Product } from '@fincommerce/data';
export declare const useEditProductAction: ({ postType }: {
    postType: string;
}) => {
    id: string;
    label: string;
    isPrimary: boolean;
    icon: import("react").JSX.Element;
    supportsBulk: boolean;
    isEligible(product: Product): boolean;
    callback(items: Product[]): void;
};
//# sourceMappingURL=index.d.ts.map