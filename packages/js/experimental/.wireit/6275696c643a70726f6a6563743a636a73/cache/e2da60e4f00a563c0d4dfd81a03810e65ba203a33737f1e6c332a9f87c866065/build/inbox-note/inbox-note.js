"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxNoteCard = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const react_intersection_observer_1 = require("react-intersection-observer");
const moment_1 = __importDefault(require("moment"));
const clsx_1 = __importDefault(require("clsx"));
const components_2 = require("@fincommerce/components");
const dompurify_1 = require("dompurify");
/**
 * Internal dependencies
 */
const action_1 = require("./action");
const use_callback_on_link_click_1 = require("./use-callback-on-link-click");
const ALLOWED_TAGS = ['a', 'b', 'em', 'i', 'strong', 'p', 'br'];
const ALLOWED_ATTR = ['target', 'href', 'rel', 'name', 'download'];
const sanitizeHTML = (html) => {
    return {
        __html: (0, dompurify_1.sanitize)(html, { ALLOWED_TAGS, ALLOWED_ATTR }),
    };
};
const InboxNoteCard = ({ note, onDismiss, onNoteActionClick, onBodyLinkClick, onNoteVisible, className, }) => {
    const [clickedActionText, setClickedActionText] = (0, element_1.useState)(false);
    const { ref } = (0, react_intersection_observer_1.useInView)({
        triggerOnce: true,
        // Set the threshold to 1 to ensure the entire note content is visible before the callback is called
        threshold: 1,
        onChange: (inView) => {
            if (inView && onNoteVisible) {
                onNoteVisible(note);
            }
        },
    });
    const linkCallbackRef = (0, use_callback_on_link_click_1.useCallbackOnLinkClick)((innerLink) => {
        if (onBodyLinkClick) {
            onBodyLinkClick(note, innerLink);
        }
    });
    const renderDismissButton = () => {
        if (clickedActionText) {
            return null;
        }
        return ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-admin-dismiss-notification", onClick: () => onDismiss && onDismiss(note) }, (0, i18n_1.__)('Dismiss', 'fincommerce')));
    };
    const onActionClicked = (action) => {
        if (onNoteActionClick) {
            onNoteActionClick(note, action);
        }
        if (!action.actioned_text) {
            return;
        }
        setClickedActionText(action.actioned_text);
    };
    const renderActions = () => {
        const { actions: noteActions } = note;
        if (!!clickedActionText) {
            return clickedActionText;
        }
        if (!noteActions) {
            return;
        }
        return ((0, element_1.createElement)(element_1.Fragment, null, noteActions.map((action) => ((0, element_1.createElement)(action_1.InboxNoteActionButton, { key: action.id, label: action.label, variant: "secondary", href: action && action.url && action.url.length
                ? action.url
                : undefined, onClick: () => onActionClicked(action) })))));
    };
    const { content, date_created_gmt: dateCreatedGmt, image, is_deleted: isDeleted, layout, status, title, is_read, } = note;
    if (isDeleted) {
        return null;
    }
    const unread = is_read === false;
    const hasImage = layout === 'thumbnail';
    const cardClassName = (0, clsx_1.default)('fincommerce-inbox-message', className, layout, {
        'message-is-unread': unread && status === 'unactioned',
    });
    const actionWrapperClassName = (0, clsx_1.default)('fincommerce-inbox-message__actions', {
        'has-multiple-actions': note.actions?.length > 1,
    });
    return ((0, element_1.createElement)("section", { ref: ref, className: cardClassName },
        hasImage && ((0, element_1.createElement)("div", { className: "fincommerce-inbox-message__image" },
            (0, element_1.createElement)("img", { src: image, alt: "" }))),
        (0, element_1.createElement)("div", { className: "fincommerce-inbox-message__wrapper" },
            (0, element_1.createElement)("div", { className: "fincommerce-inbox-message__content" },
                unread && ((0, element_1.createElement)("div", { className: "fincommerce-inbox-message__unread-indicator" })),
                dateCreatedGmt && ((0, element_1.createElement)("span", { className: "fincommerce-inbox-message__date" }, moment_1.default.utc(dateCreatedGmt).fromNow())),
                (0, element_1.createElement)(components_2.H, { className: "fincommerce-inbox-message__title" },
                    note.actions && note.actions.length === 1 && ((0, element_1.createElement)(action_1.InboxNoteActionButton, { key: note.actions[0].id, label: title, preventBusyState: true, variant: "link", href: note.actions[0].url &&
                            note.actions[0].url.length
                            ? note.actions[0].url
                            : undefined, onClick: () => onActionClicked(note.actions[0]) })),
                    note.actions && note.actions.length > 1 && title),
                (0, element_1.createElement)(components_2.Section, { className: "fincommerce-inbox-message__text" },
                    (0, element_1.createElement)("span", { dangerouslySetInnerHTML: sanitizeHTML(content), ref: linkCallbackRef }))),
            (0, element_1.createElement)("div", { className: actionWrapperClassName },
                renderActions(),
                renderDismissButton()))));
};
exports.InboxNoteCard = InboxNoteCard;
