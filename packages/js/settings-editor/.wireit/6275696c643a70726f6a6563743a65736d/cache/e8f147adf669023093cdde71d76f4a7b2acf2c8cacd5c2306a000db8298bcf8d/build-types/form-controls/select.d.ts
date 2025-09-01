import type { DataFormControlProps } from '@wordpress/dataviews';
/**
 * Internal dependencies
 */
import type { DataFormItem } from '../types';
type SelectProps = DataFormControlProps<DataFormItem> & {
    help?: React.ReactNode;
};
export declare const Select: ({ field, onChange, data, help, hideLabelFromVision, }: SelectProps) => JSX.Element;
export {};
//# sourceMappingURL=select.d.ts.map