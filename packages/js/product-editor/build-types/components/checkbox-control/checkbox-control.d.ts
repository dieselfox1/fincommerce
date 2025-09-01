export type CheckboxProps = {
    label: string;
    value: boolean | string | null;
    tooltip?: string;
    title?: string;
    onChange: (selected: boolean | string | null) => void;
    checkedValue?: string | null;
    uncheckedValue?: string | null;
    disabled?: boolean;
};
export declare const Checkbox: ({ value, label, onChange, tooltip, title, checkedValue, uncheckedValue, disabled, }: CheckboxProps) => JSX.Element;
//# sourceMappingURL=checkbox-control.d.ts.map