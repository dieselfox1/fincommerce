"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ModalEditorWelcomeGuide;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const default_1 = __importDefault(require("./default"));
/**
 * The components from this directory are copied from gutenberg.
 * They are used to show the welcome guide if the user opens the block editor for the first time from the product editor.
 * Ideally it should be exposed from gutenberg and we should use it from there.
 */
function ModalEditorWelcomeGuide() {
    const { isActive } = (0, data_1.useSelect)((select) => {
        const { get } = select('core/preferences');
        return {
            isActive: get('core/edit-post', 'welcomeGuide'),
        };
    }, []);
    if (!isActive) {
        return null;
    }
    return (0, element_1.createElement)(default_1.default, null);
}
