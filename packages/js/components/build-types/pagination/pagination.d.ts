export type PaginationProps = {
    page: number;
    perPage: number;
    total: number;
    onPageChange?: (page: number, action?: 'previous' | 'next' | 'goto') => void;
    onPerPageChange?: (perPage: number) => void;
    className?: string;
    showPagePicker?: boolean;
    showPerPagePicker?: boolean;
    showPageArrowsLabel?: boolean;
    perPageOptions?: number[];
    children?: (props: {
        pageCount: number;
    }) => JSX.Element;
};
export declare function Pagination({ page, onPageChange, total, perPage, onPerPageChange, showPagePicker, showPerPagePicker, showPageArrowsLabel, className, perPageOptions, children, }: PaginationProps): JSX.Element | null;
//# sourceMappingURL=pagination.d.ts.map