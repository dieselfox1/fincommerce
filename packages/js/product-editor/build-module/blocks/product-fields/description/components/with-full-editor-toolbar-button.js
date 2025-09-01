/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockControls } from '@wordpress/block-editor';
import FullEditorToolbarButton from './full-editor-toolbar-button';
const wooBlockwithFullEditorToolbarButton = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        // Only extend summary field block instances
        if (props?.name !== 'fincommerce/product-summary-field') {
            return createElement(BlockEdit, { ...props });
        }
        /*
         * Extend the toolbar only to the summary field block instance
         * that has the `fincommerce/product-description-field__content` template block ID.
         */
        if (props?.attributes?._templateBlockId !==
            'product-description__content') {
            return createElement(BlockEdit, { ...props });
        }
        const blockControlProps = { group: 'other' };
        return (createElement(Fragment, null,
            createElement(BlockControls, { ...blockControlProps },
                createElement(FullEditorToolbarButton, null)),
            createElement(BlockEdit, { ...props })));
    };
}, 'wooBlockwithFullEditorToolbarButton');
export default wooBlockwithFullEditorToolbarButton;
