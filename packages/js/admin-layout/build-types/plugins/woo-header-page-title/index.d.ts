/**
 * External dependencies
 */
import { Slot, Fill } from '@wordpress/components';
export declare const WC_HEADER_PAGE_TITLE_SLOT_NAME = "fincommerce_header_page_title";
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
export declare const WooHeaderPageTitle: {
    ({ children, }: Omit<React.ComponentProps<typeof Fill>, "name">): JSX.Element;
    Slot({ fillProps, }: {
        fillProps?: React.ComponentProps<typeof Slot>["fillProps"];
    }): JSX.Element;
};
//# sourceMappingURL=index.d.ts.map