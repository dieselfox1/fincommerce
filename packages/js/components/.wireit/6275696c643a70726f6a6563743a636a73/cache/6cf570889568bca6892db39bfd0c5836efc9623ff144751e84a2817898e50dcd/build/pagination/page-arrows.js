"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageArrows = PageArrows;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
function PageArrows({ pageCount, currentPage, showPageArrowsLabel = true, setCurrentPage, }) {
    function previousPage(event) {
        event.stopPropagation();
        if (currentPage - 1 < 1) {
            return;
        }
        setCurrentPage(currentPage - 1, 'previous');
    }
    function nextPage(event) {
        event.stopPropagation();
        if (currentPage + 1 > pageCount) {
            return;
        }
        setCurrentPage(currentPage + 1, 'next');
    }
    if (pageCount <= 1) {
        return null;
    }
    const previousLinkClass = (0, clsx_1.default)('fincommerce-pagination__link', {
        'is-active': currentPage > 1,
    });
    const nextLinkClass = (0, clsx_1.default)('fincommerce-pagination__link', {
        'is-active': currentPage < pageCount,
    });
    return ((0, element_1.createElement)("div", { className: "fincommerce-pagination__page-arrows" },
        showPageArrowsLabel && ((0, element_1.createElement)("span", { className: "fincommerce-pagination__page-arrows-label", role: "status", "aria-live": "polite" }, (0, i18n_1.sprintf)(
        /* translators: 1: current page number, 2: total number of pages */
        (0, i18n_1.__)('Page %1$d of %2$d', 'fincommerce'), currentPage, pageCount))),
        (0, element_1.createElement)("div", { className: "fincommerce-pagination__page-arrows-buttons" },
            (0, element_1.createElement)(components_1.Button, { className: previousLinkClass, disabled: !(currentPage > 1), onClick: previousPage, label: (0, i18n_1.__)('Previous Page', 'fincommerce') },
                (0, element_1.createElement)(components_1.Icon, { icon: icons_1.chevronLeft })),
            (0, element_1.createElement)(components_1.Button, { className: nextLinkClass, disabled: !(currentPage < pageCount), onClick: nextPage, label: (0, i18n_1.__)('Next Page', 'fincommerce') },
                (0, element_1.createElement)(components_1.Icon, { icon: icons_1.chevronRight })))));
}
