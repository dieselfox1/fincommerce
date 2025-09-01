"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePagination = usePagination;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
function usePagination({ totalCount, defaultPerPage = 25, onPageChange, onPerPageChange, }) {
    const [currentPage, setCurrentPage] = (0, element_1.useState)(1);
    const [perPage, setPerPage] = (0, element_1.useState)(defaultPerPage);
    const pageCount = Math.ceil(totalCount / perPage);
    const start = perPage * (currentPage - 1) + 1;
    const end = Math.min(perPage * currentPage, totalCount);
    return {
        start,
        end,
        currentPage,
        perPage,
        pageCount,
        setCurrentPage: (newPage) => {
            setCurrentPage(newPage);
            if (onPageChange) {
                onPageChange(newPage);
            }
        },
        setPerPageChange: (newPerPage) => {
            setCurrentPage(1);
            setPerPage(newPerPage);
            if (onPerPageChange) {
                onPerPageChange(newPerPage);
            }
        },
    };
}
