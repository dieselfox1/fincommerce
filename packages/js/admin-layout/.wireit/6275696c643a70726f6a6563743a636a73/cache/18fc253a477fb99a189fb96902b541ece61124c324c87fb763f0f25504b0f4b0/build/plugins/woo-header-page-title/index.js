"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooHeaderPageTitle = exports.WC_HEADER_PAGE_TITLE_SLOT_NAME = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
exports.WC_HEADER_PAGE_TITLE_SLOT_NAME = 'fincommerce_header_page_title';
/**
 * Create a Fill for extensions to add custom page titles.
 *
 * @slotFill WooHeaderPageTitle
 * @scope fincommerce-admin
 * @example
 * const MyPageTitle = () => (
 * 	<WooHeaderPageTitle>My page title</WooHeaderPageTitle>
 * );
 *
 * registerPlugin( 'my-page-title', {
 * 	render: MyPageTitle,
 * 	scope: 'fincommerce-admin',
 * } );
 * @param {Object} param0
 * @param {Array}  param0.children - Node children.
 */
const WooHeaderPageTitle = ({ children, }) => {
    return (0, element_1.createElement)(components_1.Fill, { name: exports.WC_HEADER_PAGE_TITLE_SLOT_NAME }, children);
};
exports.WooHeaderPageTitle = WooHeaderPageTitle;
exports.WooHeaderPageTitle.Slot = ({ fillProps, }) => ((0, element_1.createElement)(components_1.Slot, { name: exports.WC_HEADER_PAGE_TITLE_SLOT_NAME, fillProps: fillProps }, (fills) => {
    // @ts-expect-error TypeScript infers `fills` as a single ReactNode, but it is actually an array of ReactNode. https://github.com/WordPress/gutenberg/blob/3416bf4b0db6679b86e8e4226cbdb0d3387b25d7/packages/components/src/slot-fill/slot.tsx#L71-L83
    // Need to fix this upstream.
    return (0, element_1.createElement)(element_1.Fragment, null, [...fills].pop());
}));
