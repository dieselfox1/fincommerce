import type { DataFormControlProps } from '@wordpress/dataviews';
/**
 * Internal dependencies
 */
import type { DataFormItem } from '../types';
type SingleSelectPageEditProps = DataFormControlProps<DataFormItem> & {
    help?: React.ReactNode;
    className?: string;
};
export declare const SingleSelectPage: ({ data, field, onChange, hideLabelFromVision, help, className, }: SingleSelectPageEditProps) => JSX.Element;
export {};
//# sourceMappingURL=single-select-page.d.ts.map