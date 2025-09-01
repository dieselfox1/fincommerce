export type usePaginationProps = {
    totalCount: number;
    defaultPerPage?: number;
    onPageChange?: (page: number) => void;
    onPerPageChange?: (page: number) => void;
};
export declare function usePagination({ totalCount, defaultPerPage, onPageChange, onPerPageChange, }: usePaginationProps): {
    start: number;
    end: number;
    currentPage: number;
    perPage: number;
    pageCount: number;
    setCurrentPage: (newPage: number) => void;
    setPerPageChange: (newPerPage: number) => void;
};
//# sourceMappingURL=use-pagination.d.ts.map