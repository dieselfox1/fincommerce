type PageArrowsProps = {
    currentPage: number;
    pageCount: number;
    showPageArrowsLabel?: boolean;
    setCurrentPage: (page: number, action?: 'previous' | 'next' | 'goto') => void;
};
export declare function PageArrows({ pageCount, currentPage, showPageArrowsLabel, setCurrentPage, }: PageArrowsProps): JSX.Element | null;
export {};
//# sourceMappingURL=page-arrows.d.ts.map