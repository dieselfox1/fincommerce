/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { privateApis as routerPrivateApis } from '@wordpress/router';
/**
 * Internal dependencies
 */
import { unlock } from '../lock-unlock';
import ProductList from './product-list';
import ProductEdit from './product-edit';
import DataViewsSidebarContent from './sidebar-dataviews';
import SidebarNavigationScreen from './sidebar-navigation-screen';
const { useLocation } = unlock(routerPrivateApis);
export default function useLayoutAreas() {
    const { params = {} } = useLocation();
    const { postType = 'product', layout = 'table', canvas, quickEdit: showQuickEdit, postId, } = params;
    // Products list.
    if (['product'].includes(postType)) {
        const isListLayout = layout === 'list' || !layout;
        return {
            key: 'products-list',
            areas: {
                sidebar: (createElement(SidebarNavigationScreen, { title: 'Products', isRoot: true, content: createElement(DataViewsSidebarContent, null) })),
                content: createElement(ProductList, null),
                preview: false,
                mobile: createElement(ProductList, { postType: postType }),
                edit: showQuickEdit && (createElement(ProductEdit, { postType: postType, postId: postId })),
            },
            widths: {
                edit: showQuickEdit && !isListLayout ? 380 : undefined,
            },
        };
    }
    // Fallback shows the home page preview
    return {
        key: 'default',
        areas: {
            preview: false,
            mobile: canvas === 'edit',
        },
    };
}
