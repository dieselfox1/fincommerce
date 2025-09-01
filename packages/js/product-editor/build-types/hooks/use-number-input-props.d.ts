export type NumberInputProps = {
    value: string;
    onChange: (value: string | undefined) => void;
    onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    inputMode: 'decimal';
};
type Props = {
    value: string;
    onChange: (value: string) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    min: number;
    max: number;
};
export declare const useNumberInputProps: ({ value, onChange, onFocus, onKeyDown, min, max, }: Props) => NumberInputProps;
export {};
//# sourceMappingURL=use-number-input-props.d.ts.map