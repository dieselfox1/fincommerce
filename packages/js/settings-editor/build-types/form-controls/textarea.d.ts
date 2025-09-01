import type { DataFormControlProps } from '@wordpress/dataviews';
/**
 * Internal dependencies
 */
import type { DataFormItem } from '../types';
type TextareaProps = DataFormControlProps<DataFormItem> & {
    help?: React.ReactNode;
};
export declare const Textarea: ({ field, onChange, data, help }: TextareaProps) => JSX.Element;
export {};
//# sourceMappingURL=textarea.d.ts.map