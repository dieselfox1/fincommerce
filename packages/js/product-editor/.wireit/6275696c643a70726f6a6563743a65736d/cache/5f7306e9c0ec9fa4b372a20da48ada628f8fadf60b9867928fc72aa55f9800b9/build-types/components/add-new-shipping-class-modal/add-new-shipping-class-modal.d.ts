import { ProductShippingClass } from '@fincommerce/data';
export type ShippingClassFormProps = {
    onAdd: () => Promise<void>;
    onCancel: () => void;
};
export type AddNewShippingClassModalProps = {
    shippingClass?: Partial<ProductShippingClass>;
    onAdd: (shippingClass: Partial<ProductShippingClass>) => Promise<ProductShippingClass>;
    onCancel: () => void;
};
export declare function AddNewShippingClassModal({ shippingClass, onAdd, onCancel, }: AddNewShippingClassModalProps): JSX.Element;
//# sourceMappingURL=add-new-shipping-class-modal.d.ts.map