"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorNotices = EditorNotices;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const notices_1 = require("@wordpress/notices");
/**
 * Internal dependencies
 */
const validation_notices_1 = require("./validation-notices");
const snackbars_1 = require("./snackbars");
const notices_slot_1 = require("../../hacks/notices-slot");
// See: https://github.com/WordPress/gutenberg/blob/5be0ec4153c3adf9f0f2513239f4f7a358ba7948/packages/editor/src/components/editor-notices/index.js
function EditorNotices() {
    const { notices } = (0, data_1.useSelect)((select) => ({
        notices: select(notices_1.store).getNotices('email-editor'),
    }), []);
    const { removeNotice } = (0, data_1.useDispatch)(notices_1.store);
    const dismissibleNotices = notices.filter(({ isDismissible, type }) => isDismissible && type === 'default');
    const nonDismissibleNotices = notices.filter(({ isDismissible, type }) => !isDismissible && type === 'default');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(notices_slot_1.NoticesSlot, { children: [(0, jsx_runtime_1.jsx)(components_1.NoticeList, { notices: nonDismissibleNotices, className: "components-editor-notices__pinned" }), (0, jsx_runtime_1.jsx)(components_1.NoticeList, { notices: dismissibleNotices, className: "components-editor-notices__dismissible", onRemove: (id) => removeNotice(id, 'email-editor') }), (0, jsx_runtime_1.jsx)(validation_notices_1.ValidationNotices, {})] }), (0, jsx_runtime_1.jsx)(snackbars_1.EditorSnackbars, { context: "global" }), (0, jsx_runtime_1.jsx)(snackbars_1.EditorSnackbars, { context: "email-editor" })] }));
}
