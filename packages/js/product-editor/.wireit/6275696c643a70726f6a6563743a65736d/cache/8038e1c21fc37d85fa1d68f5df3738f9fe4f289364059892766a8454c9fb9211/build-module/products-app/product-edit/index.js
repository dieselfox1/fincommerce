/**
 * External dependencies
 */
import { productsStore } from '@fincommerce/data';
import { DataForm, isItemValid } from '@wordpress/dataviews';
import { createElement, useState, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import clsx from 'clsx';
import { __experimentalHeading as Heading, __experimentalText as Text, __experimentalHStack as HStack, __experimentalVStack as VStack, FlexItem, Button, } from '@wordpress/components';
// @ts-expect-error missing types.
// eslint-disable-next-line @fincommerce/dependency-group
import { privateApis as editorPrivateApis } from '@wordpress/editor';
/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { productFields } from '../product-list/fields';
const { NavigableRegion } = unlock(editorPrivateApis);
const form = {
    type: 'panel',
    fields: ['name', 'status'],
};
export default function ProductEdit({ subTitle, actions, className, hideTitleFromUI = true, postType, postId = '', }) {
    const classes = clsx('edit-product-page', className, {
        'is-empty': !postId,
    });
    const ids = useMemo(() => postId.split(','), [postId]);
    const { initialEdits } = useSelect((select) => {
        return {
            initialEdits: ids.length === 1
                ? select(productsStore).getProduct(Number.parseInt(ids[0], 10))
                : null,
        };
    }, [postType, ids]);
    const [edits, setEdits] = useState({});
    const itemWithEdits = useMemo(() => {
        return {
            ...initialEdits,
            ...edits,
        };
    }, [initialEdits, edits]);
    const isUpdateDisabled = !isItemValid(itemWithEdits, 
    // @ts-expect-error productFields is not typed correctly.
    productFields, form);
    const onSubmit = async (event) => {
        event.preventDefault();
        // @ts-expect-error productFields is not typed correctly.
        if (!isItemValid(itemWithEdits, productFields, form)) {
            return;
        }
        // Empty save.
        setEdits({});
    };
    return (createElement(NavigableRegion, { className: classes, ariaLabel: __('Product Edit', 'fincommerce') },
        createElement("div", { className: "edit-product-content" },
            !hideTitleFromUI && (createElement(VStack, { className: "edit-site-page-header", as: "header", spacing: 0 },
                createElement(HStack, { className: "edit-site-page-header__page-title" },
                    createElement(Heading, { as: "h2", level: 3, weight: 500, className: "edit-site-page-header__title", truncate: true }, __('Product Edit', 'fincommerce')),
                    createElement(FlexItem, { className: "edit-site-page-header__actions" }, actions)),
                subTitle && (createElement(Text, { variant: "muted", as: "p", className: "edit-site-page-header__sub-title" }, subTitle)))),
            !postId && (createElement("p", null, __('Select a product to edit', 'fincommerce'))),
            postId && (createElement(VStack, { spacing: 4, as: "form", onSubmit: onSubmit },
                createElement(DataForm, { data: itemWithEdits, 
                    // @ts-expect-error productFields is not typed correctly.
                    fields: productFields, form: form, onChange: setEdits }),
                createElement(FlexItem, null,
                    createElement(Button, { variant: "primary", type: "submit", 
                        // @ts-expect-error missing type.
                        accessibleWhenDisabled: true, disabled: isUpdateDisabled, __next40pxDefaultSize: true }, __('Update', 'fincommerce'))))))));
}
