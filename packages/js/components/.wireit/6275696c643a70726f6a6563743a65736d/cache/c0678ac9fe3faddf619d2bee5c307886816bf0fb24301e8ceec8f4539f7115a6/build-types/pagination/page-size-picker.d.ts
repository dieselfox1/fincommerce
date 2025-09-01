export declare const DEFAULT_PER_PAGE_OPTIONS: number[];
type PageSizePickerProps = {
    currentPage: number;
    perPage: number;
    total: number;
    setCurrentPage: (page: number, action?: 'previous' | 'next' | 'goto') => void;
    setPerPageChange?: (perPage: number) => void;
    perPageOptions?: number[];
    label?: string;
};
export declare function PageSizePicker({ perPage, currentPage, total, setCurrentPage, setPerPageChange, perPageOptions, label, }: PageSizePickerProps): JSX.Element;
export {};
//# sourceMappingURL=page-size-picker.d.ts.map