"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateSelection = TemplateSelection;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const store_1 = require("../../store");
const select_modal_1 = require("./select-modal");
function TemplateSelection() {
    const [templateSelected, setTemplateSelected] = (0, element_1.useState)(false);
    const { emailContentIsEmpty, emailHasEdits, postType } = (0, data_1.useSelect)((select) => ({
        emailContentIsEmpty: select(store_1.storeName).hasEmptyContent(),
        emailHasEdits: select(store_1.storeName).hasEdits(),
        postType: select(store_1.storeName).getEmailPostType(),
    }), []);
    if (!emailContentIsEmpty || emailHasEdits || templateSelected) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(select_modal_1.SelectTemplateModal, { onSelectCallback: () => setTemplateSelected(true), postType: postType }));
}
