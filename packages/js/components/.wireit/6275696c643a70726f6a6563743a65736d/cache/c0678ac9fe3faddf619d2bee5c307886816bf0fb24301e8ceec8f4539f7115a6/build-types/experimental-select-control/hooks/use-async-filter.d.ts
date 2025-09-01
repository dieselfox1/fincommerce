/**
 * Internal dependencies
 */
import { SelectControlProps } from '../select-control';
export declare const DEFAULT_DEBOUNCE_TIME = 250;
export default function useAsyncFilter<T>({ filter, onFilterStart, onFilterEnd, onFilterError, debounceTime, }: UseAsyncFilterInput<T>): UseAsyncFilterOutput<T>;
export type UseAsyncFilterInput<T> = {
    filter(value?: string): Promise<T[]>;
    onFilterStart?(value?: string): void;
    onFilterEnd?(filteredItems: T[], value?: string): void;
    onFilterError?(error: Error, value?: string): void;
    debounceTime?: number;
};
export type UseAsyncFilterOutput<T> = Pick<SelectControlProps<T>, 'suffix' | 'onInputChange' | 'getFilteredItems'> & {
    isFetching: boolean;
};
//# sourceMappingURL=use-async-filter.d.ts.map