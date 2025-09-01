"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductList;
/**
 * External dependencies
 */
const dataviews_1 = require("@wordpress/dataviews");
const element_1 = require("@wordpress/element");
const data_1 = require("@fincommerce/data");
const icons_1 = require("@wordpress/icons");
const router_1 = require("@wordpress/router");
const core_data_1 = require("@wordpress/core-data");
const i18n_1 = require("@wordpress/i18n");
const data_2 = require("@wordpress/data");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
// @ts-expect-error missing type.
// eslint-disable-next-line @fincommerce/dependency-group
const editor_1 = require("@wordpress/editor");
/**
 * Internal dependencies
 */
const lock_unlock_1 = require("../../lock-unlock");
const default_views_1 = require("../sidebar-dataviews/default-views");
const constants_1 = require("../constants");
const fields_1 = require("./fields");
const dataviews_actions_1 = require("../dataviews-actions");
const new_navigation_1 = require("../utilites/new-navigation");
const { NavigableRegion, usePostActions } = (0, lock_unlock_1.unlock)(editor_1.privateApis);
const { useHistory, useLocation } = (0, lock_unlock_1.unlock)(router_1.privateApis);
const PAGE_SIZE = 25;
const EMPTY_ARRAY = [];
const getDefaultView = (defaultViews, activeView) => {
    return defaultViews.find(({ slug }) => slug === activeView)?.view;
};
/**
 * This function abstracts working with default & custom views by
 * providing a [ state, setState ] tuple based on the URL parameters.
 *
 * Consumers use the provided tuple to work with state
 * and don't have to deal with the specifics of default & custom views.
 *
 * @param {string} postType Post type to retrieve default views for.
 * @return {Array} The [ state, setState ] tuple.
 */
function useView(postType) {
    const { params: { activeView = 'all', isCustom = 'false', layout }, } = useLocation();
    const history = useHistory();
    const defaultViews = (0, default_views_1.useDefaultViews)({ postType });
    const [view, setView] = (0, element_1.useState)(() => {
        const initialView = getDefaultView(defaultViews, activeView) ?? {
            type: layout ?? constants_1.LAYOUT_LIST,
        };
        const type = layout ?? initialView.type;
        return {
            ...initialView,
            type,
        };
    });
    const setViewWithUrlUpdate = (0, element_1.useCallback)((newView) => {
        const { params } = history.getLocationWithParams();
        if (newView.type === constants_1.LAYOUT_LIST && !params?.layout) {
            // Skip updating the layout URL param if
            // it is not present and the newView.type is LAYOUT_LIST.
        }
        else if (newView.type !== params?.layout) {
            history.push({
                ...params,
                layout: newView.type,
            });
        }
        setView(newView);
    }, [history]);
    // When layout URL param changes, update the view type
    // without affecting any other config.
    (0, element_1.useEffect)(() => {
        setView((prevView) => ({
            ...prevView,
            type: layout ?? constants_1.LAYOUT_LIST,
        }));
    }, [layout]);
    // When activeView or isCustom URL parameters change, reset the view.
    (0, element_1.useEffect)(() => {
        const newView = getDefaultView(defaultViews, activeView);
        if (newView) {
            const type = layout ?? newView.type;
            setView({
                ...newView,
                type,
            });
        }
    }, [activeView, isCustom, layout, defaultViews]);
    return [view, setViewWithUrlUpdate, setViewWithUrlUpdate];
}
function getItemId(item) {
    return item.id.toString();
}
function ProductList({ subTitle, className, hideTitleFromUI = false, }) {
    const [showNewNavigation, setNewNavigation] = (0, new_navigation_1.useNewNavigation)();
    const history = useHistory();
    const location = useLocation();
    const { postId, quickEdit = false, postType = 'product', isCustom, activeView = 'all', } = location.params;
    const [selection, setSelection] = (0, element_1.useState)([postId]);
    const [view, setView] = useView(postType);
    const queryParams = (0, element_1.useMemo)(() => {
        const filters = {};
        view.filters?.forEach((filter) => {
            if (filter.field === 'status') {
                filters.status = Array.isArray(filter.value)
                    ? filter.value.join(',')
                    : filter.value;
            }
        });
        const orderby = view.sort?.field === 'name'
            ? 'title'
            : view.sort?.field;
        return {
            per_page: view.perPage,
            page: view.page,
            order: view.sort?.direction,
            orderby,
            search: view.search,
            ...filters,
        };
    }, [view]);
    const onChangeSelection = (0, element_1.useCallback)((items) => {
        setSelection(items);
        history.push({
            ...location.params,
            postId: items.join(','),
        });
    }, [history, location.params]);
    // TODO: Use the Woo data store to get all the products, as this doesn't contain all the product data.
    const { records, totalCount, isLoading } = (0, data_2.useSelect)((select) => {
        const { getProducts, getProductsTotalCount, isResolving } = select(data_1.productsStore);
        return {
            records: getProducts(queryParams),
            totalCount: getProductsTotalCount(queryParams),
            isLoading: isResolving('getProducts', [queryParams]),
        };
    }, [queryParams]);
    const paginationInfo = (0, element_1.useMemo)(() => ({
        totalItems: totalCount ?? 0,
        totalPages: Math.ceil((totalCount ?? 0) / (view.perPage || PAGE_SIZE)),
    }), [totalCount, view.perPage]);
    const { labels, canCreateRecord } = (0, data_2.useSelect)((select) => {
        const { getPostType, canUser } = select(core_data_1.store);
        const postTypeData = getPostType(postType);
        return {
            labels: postTypeData?.labels,
            // @ts-expect-error Selector is not typed
            canCreateRecord: canUser('create', {
                kind: 'postType',
                name: postType,
            }),
        };
    }, [postType]);
    const postTypeActions = usePostActions({
        postType,
        context: 'list',
    });
    const editAction = (0, dataviews_actions_1.useEditProductAction)({ postType });
    const actions = (0, element_1.useMemo)(() => [editAction, ...postTypeActions], [postTypeActions, editAction]);
    const classes = (0, clsx_1.default)('edit-site-page', className);
    return ((0, element_1.createElement)(NavigableRegion, { className: classes, ariaLabel: (0, i18n_1.__)('Products', 'fincommerce') },
        (0, element_1.createElement)("div", { className: "edit-site-page-content" },
            !hideTitleFromUI && ((0, element_1.createElement)(components_1.__experimentalVStack, { className: "edit-site-page-header", as: "header", spacing: 0 },
                (0, element_1.createElement)(components_1.__experimentalHStack, { className: "edit-site-page-header__page-title" },
                    (0, element_1.createElement)(components_1.__experimentalHeading, { as: "h2", level: 3, weight: 500, className: "edit-site-page-header__title", truncate: true }, (0, i18n_1.__)('Products', 'fincommerce')),
                    (0, element_1.createElement)(components_1.FlexItem, { className: "edit-site-page-header__actions" }, labels?.add_new_item && canCreateRecord && ((0, element_1.createElement)(element_1.Fragment, null,
                        (0, element_1.createElement)(components_1.Button, { variant: "primary", disabled: true, __next40pxDefaultSize: true }, labels.add_new_item))))),
                subTitle && ((0, element_1.createElement)(components_1.__experimentalText, { variant: "muted", as: "p", className: "edit-site-page-header__sub-title" }, subTitle)))),
            (0, element_1.createElement)(dataviews_1.DataViews, { key: activeView + isCustom, paginationInfo: paginationInfo, fields: fields_1.productFields, data: records || EMPTY_ARRAY, isLoading: isLoading, view: view, actions: actions, onChangeView: setView, onChangeSelection: onChangeSelection, getItemId: getItemId, selection: selection, defaultLayouts: default_views_1.defaultLayouts, header: (0, element_1.createElement)(element_1.Fragment, null,
                    (0, element_1.createElement)(components_1.Button, { size: "compact", icon: showNewNavigation ? icons_1.seen : icons_1.unseen, label: (0, i18n_1.__)('Toggle navigation', 'fincommerce'), onClick: () => {
                            setNewNavigation(!showNewNavigation);
                        } }),
                    (0, element_1.createElement)(components_1.Button, { size: "compact", isPressed: quickEdit, icon: icons_1.drawerRight, label: (0, i18n_1.__)('Toggle details panel', 'fincommerce'), onClick: () => {
                            history.push({
                                ...location.params,
                                quickEdit: quickEdit ? undefined : true,
                            });
                        } })) }))));
}
