import { Product } from '@fincommerce/data';
type EditProductLinkModalProps = {
    product: Product;
    permalinkPrefix: string;
    permalinkSuffix: string;
    onCancel: () => void;
    onSaved: () => void;
    saveHandler: (slug: string) => Promise<{
        slug: string;
        permalink: string;
    } | undefined>;
};
export declare const EditProductLinkModal: ({ product, permalinkPrefix, permalinkSuffix, onCancel, onSaved, saveHandler, }: EditProductLinkModalProps) => JSX.Element;
export {};
//# sourceMappingURL=edit-product-link-modal.d.ts.map