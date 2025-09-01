import { ProductAttributeTerm } from '@fincommerce/data';
type CreateAttributeTermModalProps = {
    initialAttributeTermName: string;
    attributeId: number;
    onCancel?: () => void;
    onCreated?: (newAttribute: ProductAttributeTerm) => void;
};
export declare const CreateAttributeTermModal: ({ initialAttributeTermName, attributeId, onCancel, onCreated, }: CreateAttributeTermModalProps) => JSX.Element;
export {};
//# sourceMappingURL=create-attribute-term-modal.d.ts.map