"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEditorMode = useEditorMode;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const editor_1 = require("@wordpress/editor");
function useEditorMode() {
    const { isEditingTemplate } = (0, data_1.useSelect)((select) => ({
        isEditingTemplate: select(editor_1.store).getCurrentPostType() === 'wp_template',
    }), []);
    return [isEditingTemplate ? 'template' : 'email'];
}
