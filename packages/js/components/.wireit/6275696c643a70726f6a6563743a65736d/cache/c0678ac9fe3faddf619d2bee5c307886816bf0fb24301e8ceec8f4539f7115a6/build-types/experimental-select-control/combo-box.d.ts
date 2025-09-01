type ComboBoxProps = {
    children?: React.ReactNode | null;
    comboBoxProps: JSX.IntrinsicElements['div'];
    inputProps: JSX.IntrinsicElements['input'];
    getToggleButtonProps?: () => Omit<JSX.IntrinsicElements['button'], 'ref'>;
    suffix?: JSX.Element | null;
    showToggleButton?: boolean;
};
export declare const ComboBox: ({ children, comboBoxProps, getToggleButtonProps, inputProps, suffix, showToggleButton, }: ComboBoxProps) => JSX.Element;
export {};
//# sourceMappingURL=combo-box.d.ts.map