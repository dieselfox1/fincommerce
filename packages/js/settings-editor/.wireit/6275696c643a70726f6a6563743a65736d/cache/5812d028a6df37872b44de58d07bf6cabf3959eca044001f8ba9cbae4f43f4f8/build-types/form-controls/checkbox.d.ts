import type { DataFormControlProps } from '@wordpress/dataviews';
/**
 * Internal dependencies
 */
import type { DataFormItem } from '../types';
type CheckboxProps = DataFormControlProps<DataFormItem> & {
    help?: React.ReactNode;
};
export declare const Checkbox: ({ field, onChange, data, help }: CheckboxProps) => JSX.Element;
export {};
//# sourceMappingURL=checkbox.d.ts.map