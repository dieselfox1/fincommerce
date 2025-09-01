type PageArrowsWithPickerProps = {
    currentPage: number;
    pageCount: number;
    setCurrentPage: (page: number, action?: 'previous' | 'next' | 'goto') => void;
};
export declare function PageArrowsWithPicker({ pageCount, currentPage, setCurrentPage, }: PageArrowsWithPickerProps): JSX.Element | null;
export {};
//# sourceMappingURL=page-arrows-with-picker.d.ts.map