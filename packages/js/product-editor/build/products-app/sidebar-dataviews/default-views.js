"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLayouts = void 0;
exports.useDefaultViews = useDefaultViews;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
const core_data_1 = require("@wordpress/core-data");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
exports.defaultLayouts = {
    [constants_1.LAYOUT_TABLE]: {
        layout: {
            primaryField: 'name',
            styles: {
                name: {
                    maxWidth: 300,
                },
            },
        },
    },
    [constants_1.LAYOUT_GRID]: {
        layout: {
            mediaField: 'featured-image',
            primaryField: 'name',
        },
    },
    [constants_1.LAYOUT_LIST]: {
        layout: {
            primaryField: 'name',
            mediaField: 'featured-image',
        },
    },
};
const DEFAULT_POST_BASE = {
    type: constants_1.LAYOUT_TABLE,
    search: '',
    filters: [],
    page: 1,
    perPage: 20,
    sort: {
        field: 'date',
        direction: 'desc',
    },
    fields: ['name', 'sku', 'status', 'date'],
    layout: exports.defaultLayouts[constants_1.LAYOUT_LIST].layout,
};
function useDefaultViews({ postType }) {
    const labels = (0, data_1.useSelect)((select) => {
        const { getPostType } = select(core_data_1.store);
        const postTypeData = 
        // @ts-expect-error getPostType is not typed correctly because we are overriding the type definition. https://github.com/dieselfox1/fincommerce/blob/eeaf58e20064d837412d6c455e69cc5a5e2678b4/packages/js/product-editor/typings/index.d.ts#L15-L35
        getPostType(postType);
        return postTypeData?.labels;
    }, [postType]);
    return (0, element_1.useMemo)(() => {
        return [
            {
                title: labels?.all_items || (0, i18n_1.__)('All items', 'fincommerce'),
                slug: 'all',
                icon: icons_1.pages,
                view: { ...DEFAULT_POST_BASE },
            },
            {
                title: (0, i18n_1.__)('Published', 'fincommerce'),
                slug: 'published',
                icon: icons_1.published,
                view: {
                    ...DEFAULT_POST_BASE,
                    filters: [
                        {
                            field: 'status',
                            operator: constants_1.OPERATOR_IS,
                            value: 'publish',
                        },
                    ],
                },
            },
            {
                title: (0, i18n_1.__)('Scheduled', 'fincommerce'),
                slug: 'future',
                icon: icons_1.scheduled,
                view: {
                    ...DEFAULT_POST_BASE,
                    filters: [
                        {
                            field: 'status',
                            operator: constants_1.OPERATOR_IS,
                            value: 'future',
                        },
                    ],
                },
            },
            {
                title: (0, i18n_1.__)('Drafts', 'fincommerce'),
                slug: 'drafts',
                icon: icons_1.drafts,
                view: {
                    ...DEFAULT_POST_BASE,
                    filters: [
                        {
                            field: 'status',
                            operator: constants_1.OPERATOR_IS,
                            value: 'draft',
                        },
                    ],
                },
            },
            {
                title: (0, i18n_1.__)('Private', 'fincommerce'),
                slug: 'private',
                icon: icons_1.notAllowed,
                view: {
                    ...DEFAULT_POST_BASE,
                    filters: [
                        {
                            field: 'status',
                            operator: constants_1.OPERATOR_IS,
                            value: 'private',
                        },
                    ],
                },
            },
            {
                title: (0, i18n_1.__)('Trash', 'fincommerce'),
                slug: 'trash',
                icon: icons_1.trash,
                view: {
                    ...DEFAULT_POST_BASE,
                    type: constants_1.LAYOUT_TABLE,
                    layout: exports.defaultLayouts[constants_1.LAYOUT_TABLE].layout,
                    filters: [
                        {
                            field: 'status',
                            operator: constants_1.OPERATOR_IS,
                            value: 'trash',
                        },
                    ],
                },
            },
        ];
    }, [labels]);
}
