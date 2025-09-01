"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLayoutAreas;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const router_1 = require("@wordpress/router");
/**
 * Internal dependencies
 */
const lock_unlock_1 = require("../lock-unlock");
const product_list_1 = __importDefault(require("./product-list"));
const product_edit_1 = __importDefault(require("./product-edit"));
const sidebar_dataviews_1 = __importDefault(require("./sidebar-dataviews"));
const sidebar_navigation_screen_1 = __importDefault(require("./sidebar-navigation-screen"));
const { useLocation } = (0, lock_unlock_1.unlock)(router_1.privateApis);
function useLayoutAreas() {
    const { params = {} } = useLocation();
    const { postType = 'product', layout = 'table', canvas, quickEdit: showQuickEdit, postId, } = params;
    // Products list.
    if (['product'].includes(postType)) {
        const isListLayout = layout === 'list' || !layout;
        return {
            key: 'products-list',
            areas: {
                sidebar: ((0, element_1.createElement)(sidebar_navigation_screen_1.default, { title: 'Products', isRoot: true, content: (0, element_1.createElement)(sidebar_dataviews_1.default, null) })),
                content: (0, element_1.createElement)(product_list_1.default, null),
                preview: false,
                mobile: (0, element_1.createElement)(product_list_1.default, { postType: postType }),
                edit: showQuickEdit && ((0, element_1.createElement)(product_edit_1.default, { postType: postType, postId: postId })),
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
