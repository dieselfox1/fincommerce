import type { DataFormControlProps } from '@wordpress/dataviews';
/**
 * Internal dependencies
 */
import type { DataFormItem } from '../types';
type InputProps = DataFormControlProps<DataFormItem> & {
    type: React.HTMLInputTypeAttribute;
    help?: React.ReactNode;
};
export declare const Input: ({ field, onChange, data, help, type }: InputProps) => JSX.Element;
export {};
//# sourceMappingURL=input.d.ts.map