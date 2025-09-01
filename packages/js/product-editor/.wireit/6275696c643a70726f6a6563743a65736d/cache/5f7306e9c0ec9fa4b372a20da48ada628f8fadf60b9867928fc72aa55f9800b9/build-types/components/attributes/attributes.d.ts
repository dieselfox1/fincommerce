import { ProductProductAttribute } from '@fincommerce/data';
type AttributesProps = {
    attributeList?: ProductProductAttribute[];
    value: ProductProductAttribute[];
    onChange: (value: ProductProductAttribute[]) => void;
};
/**
 * This component is no longer in active use.
 * It is kept here for backward compatibility because is being used in the `AttributesField` component, under
 * `plugins/fincommerce-admin/client/products/fills/attributes-section/attributes-field.tsx`.
 */
export declare const Attributes: ({ value, onChange, attributeList, }: AttributesProps) => JSX.Element;
export {};
//# sourceMappingURL=attributes.d.ts.map