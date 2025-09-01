export type NumberProps = {
    id?: string;
    value: string;
    onChange: (selected: string) => void;
    label: string | JSX.Element;
    suffix?: string;
    help?: string;
    error?: string;
    placeholder?: string;
    onBlur?: () => void;
    onFocus?: () => void;
    required?: boolean;
    tooltip?: string;
    disabled?: boolean;
    step?: number;
    min?: number;
    max?: number;
};
export declare const NumberControl: import("react").ForwardRefExoticComponent<NumberProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=number-control.d.ts.map