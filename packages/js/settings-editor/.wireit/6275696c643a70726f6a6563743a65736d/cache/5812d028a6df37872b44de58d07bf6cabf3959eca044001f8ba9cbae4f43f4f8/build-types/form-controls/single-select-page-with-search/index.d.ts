import type { DataFormControlProps } from '@wordpress/dataviews';
/**
 * Internal dependencies
 */
import type { DataFormItem } from '../../types';
type SingleSelectPageWithSearchEditProps = DataFormControlProps<DataFormItem> & {
    /**
     * The help text to display below the control.
     */
    help?: React.ReactNode;
    /**
     * The class name to apply to the control.
     */
    className?: string;
    /**
     * The pages to exclude from the search results.
     */
    exclude?: string[];
};
export declare const SingleSelectPageWithSearch: ({ data, field, onChange, hideLabelFromVision, help, className, exclude, }: SingleSelectPageWithSearchEditProps) => JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map