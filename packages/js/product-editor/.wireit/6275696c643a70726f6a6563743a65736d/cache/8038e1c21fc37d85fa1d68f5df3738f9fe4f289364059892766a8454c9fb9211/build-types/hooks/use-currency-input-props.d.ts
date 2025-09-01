export type CurrencyInputProps = {
    prefix: string;
    className: string;
    value: string;
    sanitize: (value: string | number) => string;
    onChange: (value: string | undefined) => void;
    onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
type Props = {
    value: string;
    onChange: (value: string) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
export declare const useCurrencyInputProps: ({ value, onChange, onFocus, onKeyUp, }: Props) => CurrencyInputProps;
export {};
//# sourceMappingURL=use-currency-input-props.d.ts.map