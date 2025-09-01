"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorSnackbars = EditorSnackbars;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
const notices_1 = require("@wordpress/notices");
// See: https://github.com/WordPress/gutenberg/blob/2788a9cf8b8149be3ee52dd15ce91fa55815f36a/packages/editor/src/components/editor-snackbars/index.js
function EditorSnackbars({ context = 'email-editor' }) {
    const { notices } = (0, data_1.useSelect)((select) => ({
        notices: select(notices_1.store).getNotices(context),
    }), [context]);
    // Some global notices are not suitable for the email editor context
    // This map allows us to change the content of the notice
    const globalNoticeChangeMap = (0, element_1.useMemo)(() => {
        return {
            'site-editor-save-success': {
                content: (0, i18n_1.__)('Email design updated.', 'fincommerce'),
                removeActions: true,
            },
            'editor-save': {
                content: (0, i18n_1.__)('Email saved.', 'fincommerce'),
                removeActions: false,
                contentCheck: (notice) => {
                    // eslint-disable-next-line @wordpress/i18n-text-domain
                    return notice.content.includes((0, i18n_1.__)('Post updated.')); // It is intentionally without domain to match core translation
                },
            },
        };
    }, []);
    const { removeNotice } = (0, data_1.useDispatch)(notices_1.store);
    const snackbarNotices = notices
        .filter(({ type }) => type === 'snackbar')
        .map((notice) => {
        if (!globalNoticeChangeMap[notice.id]) {
            return notice;
        }
        if (globalNoticeChangeMap[notice.id].contentCheck &&
            !globalNoticeChangeMap[notice.id].contentCheck(notice)) {
            return notice;
        }
        return {
            ...notice,
            content: globalNoticeChangeMap[notice.id].content,
            spokenMessage: globalNoticeChangeMap[notice.id].content,
            actions: globalNoticeChangeMap[notice.id].removeActions
                ? []
                : notice.actions,
        };
    });
    return ((0, jsx_runtime_1.jsx)(components_1.SnackbarList, { notices: snackbarNotices, className: "components-editor-notices__snackbar", onRemove: (id) => removeNotice(id, context) }));
}
