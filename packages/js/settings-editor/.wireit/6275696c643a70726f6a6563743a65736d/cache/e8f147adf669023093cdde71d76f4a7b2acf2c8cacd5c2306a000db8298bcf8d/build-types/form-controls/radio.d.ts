import type { DataFormControlProps } from '@wordpress/dataviews';
/**
 * Internal dependencies
 */
import type { DataFormItem } from '../types';
type RadioProps = DataFormControlProps<DataFormItem> & {
    help?: React.ReactNode;
};
export declare const Radio: ({ field, onChange, data, help }: RadioProps) => JSX.Element;
export {};
//# sourceMappingURL=radio.d.ts.map