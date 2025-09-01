type PagePickerProps = {
    currentPage: number;
    pageCount: number;
    setCurrentPage: (page: number, action?: 'previous' | 'next' | 'goto') => void;
};
export declare function PagePicker({ pageCount, currentPage, setCurrentPage, }: PagePickerProps): JSX.Element;
export {};
//# sourceMappingURL=page-picker.d.ts.map