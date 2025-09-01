import { ProductAttributeTerm } from '@fincommerce/data';
type AttributeTermInputFieldProps = {
    value?: ProductAttributeTerm[];
    onChange: (value: ProductAttributeTerm[]) => void;
    attributeId?: number;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    autoCreateOnSelect?: boolean;
    readOnlyWhenClosed?: boolean;
};
export declare const AttributeTermInputField: ({ value, onChange, placeholder, disabled, attributeId, label, autoCreateOnSelect, readOnlyWhenClosed, }: AttributeTermInputFieldProps) => JSX.Element;
export {};
//# sourceMappingURL=attribute-term-input-field.d.ts.map