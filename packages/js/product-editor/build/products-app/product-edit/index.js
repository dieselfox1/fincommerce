"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductEdit;
/**
 * External dependencies
 */
const data_1 = require("@fincommerce/data");
const dataviews_1 = require("@wordpress/dataviews");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const data_2 = require("@wordpress/data");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
// @ts-expect-error missing types.
// eslint-disable-next-line @fincommerce/dependency-group
const editor_1 = require("@wordpress/editor");
/**
 * Internal dependencies
 */
const lock_unlock_1 = require("../../lock-unlock");
const fields_1 = require("../product-list/fields");
const { NavigableRegion } = (0, lock_unlock_1.unlock)(editor_1.privateApis);
const form = {
    type: 'panel',
    fields: ['name', 'status'],
};
function ProductEdit({ subTitle, actions, className, hideTitleFromUI = true, postType, postId = '', }) {
    const classes = (0, clsx_1.default)('edit-product-page', className, {
        'is-empty': !postId,
    });
    const ids = (0, element_1.useMemo)(() => postId.split(','), [postId]);
    const { initialEdits } = (0, data_2.useSelect)((select) => {
        return {
            initialEdits: ids.length === 1
                ? select(data_1.productsStore).getProduct(Number.parseInt(ids[0], 10))
                : null,
        };
    }, [postType, ids]);
    const [edits, setEdits] = (0, element_1.useState)({});
    const itemWithEdits = (0, element_1.useMemo)(() => {
        return {
            ...initialEdits,
            ...edits,
        };
    }, [initialEdits, edits]);
    const isUpdateDisabled = !(0, dataviews_1.isItemValid)(itemWithEdits, 
    // @ts-expect-error productFields is not typed correctly.
    fields_1.productFields, form);
    const onSubmit = async (event) => {
        event.preventDefault();
        // @ts-expect-error productFields is not typed correctly.
        if (!(0, dataviews_1.isItemValid)(itemWithEdits, fields_1.productFields, form)) {
            return;
        }
        // Empty save.
        setEdits({});
    };
    return ((0, element_1.createElement)(NavigableRegion, { className: classes, ariaLabel: (0, i18n_1.__)('Product Edit', 'fincommerce') },
        (0, element_1.createElement)("div", { className: "edit-product-content" },
            !hideTitleFromUI && ((0, element_1.createElement)(components_1.__experimentalVStack, { className: "edit-site-page-header", as: "header", spacing: 0 },
                (0, element_1.createElement)(components_1.__experimentalHStack, { className: "edit-site-page-header__page-title" },
                    (0, element_1.createElement)(components_1.__experimentalHeading, { as: "h2", level: 3, weight: 500, className: "edit-site-page-header__title", truncate: true }, (0, i18n_1.__)('Product Edit', 'fincommerce')),
                    (0, element_1.createElement)(components_1.FlexItem, { className: "edit-site-page-header__actions" }, actions)),
                subTitle && ((0, element_1.createElement)(components_1.__experimentalText, { variant: "muted", as: "p", className: "edit-site-page-header__sub-title" }, subTitle)))),
            !postId && ((0, element_1.createElement)("p", null, (0, i18n_1.__)('Select a product to edit', 'fincommerce'))),
            postId && ((0, element_1.createElement)(components_1.__experimentalVStack, { spacing: 4, as: "form", onSubmit: onSubmit },
                (0, element_1.createElement)(dataviews_1.DataForm, { data: itemWithEdits, 
                    // @ts-expect-error productFields is not typed correctly.
                    fields: fields_1.productFields, form: form, onChange: setEdits }),
                (0, element_1.createElement)(components_1.FlexItem, null,
                    (0, element_1.createElement)(components_1.Button, { variant: "primary", type: "submit", 
                        // @ts-expect-error missing type.
                        accessibleWhenDisabled: true, disabled: isUpdateDisabled, __next40pxDefaultSize: true }, (0, i18n_1.__)('Update', 'fincommerce'))))))));
}
