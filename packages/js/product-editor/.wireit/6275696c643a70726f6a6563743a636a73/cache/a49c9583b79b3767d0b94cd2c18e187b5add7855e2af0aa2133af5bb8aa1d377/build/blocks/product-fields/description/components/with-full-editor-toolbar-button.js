"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const compose_1 = require("@wordpress/compose");
const block_editor_1 = require("@wordpress/block-editor");
const full_editor_toolbar_button_1 = __importDefault(require("./full-editor-toolbar-button"));
const wooBlockwithFullEditorToolbarButton = (0, compose_1.createHigherOrderComponent)((BlockEdit) => {
    return (props) => {
        // Only extend summary field block instances
        if (props?.name !== 'fincommerce/product-summary-field') {
            return (0, element_1.createElement)(BlockEdit, { ...props });
        }
        /*
         * Extend the toolbar only to the summary field block instance
         * that has the `fincommerce/product-description-field__content` template block ID.
         */
        if (props?.attributes?._templateBlockId !==
            'product-description__content') {
            return (0, element_1.createElement)(BlockEdit, { ...props });
        }
        const blockControlProps = { group: 'other' };
        return ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(block_editor_1.BlockControls, { ...blockControlProps },
                (0, element_1.createElement)(full_editor_toolbar_button_1.default, null)),
            (0, element_1.createElement)(BlockEdit, { ...props })));
    };
}, 'wooBlockwithFullEditorToolbarButton');
exports.default = wooBlockwithFullEditorToolbarButton;
