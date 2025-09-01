"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskItem = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const components_1 = require("@wordpress/components");
const notice_outline_1 = __importDefault(require("gridicons/dist/notice-outline"));
const components_2 = require("@fincommerce/components");
const clsx_1 = __importDefault(require("clsx"));
const dompurify_1 = require("dompurify");
/**
 * Internal dependencies
 */
const __1 = require("../../");
const vertical_css_transition_1 = require("../../vertical-css-transition");
const ALLOWED_TAGS = ['a', 'b', 'em', 'i', 'strong', 'p', 'br'];
const ALLOWED_ATTR = ['target', 'href', 'rel', 'name', 'download'];
const sanitizeHTML = (html) => {
    return {
        __html: (0, dompurify_1.sanitize)(html, { ALLOWED_TAGS, ALLOWED_ATTR }),
    };
};
const OptionalTaskTooltip = ({ level, completed, children, }) => {
    let tooltip = '';
    if (level === 1 && !completed) {
        tooltip = (0, i18n_1.__)('This task is required to keep your store running', 'fincommerce');
    }
    else if (level === 2 && !completed) {
        tooltip = (0, i18n_1.__)('This task is required to set up your extension', 'fincommerce');
    }
    if (tooltip === '') {
        return children;
    }
    return (0, element_1.createElement)(components_1.Tooltip, { text: tooltip }, children);
};
const OptionalExpansionWrapper = ({ children, expandable, expanded, }) => {
    if (!expandable) {
        return expanded ? (0, element_1.createElement)(element_1.Fragment, null, children) : null;
    }
    return ((0, element_1.createElement)(vertical_css_transition_1.VerticalCSSTransition, { timeout: 500, in: expanded, classNames: "fincommerce-task-list__item-expandable-content", defaultStyle: {
            transitionProperty: 'max-height, opacity',
        } }, children));
};
const TaskItem = ({ completed, inProgress, inProgressLabel, title, badge, onDelete, onCollapse, onDismiss, onSnooze, onExpand, onClick, additionalInfo, time, content, expandable = false, expanded = false, showActionButton, level = 3, action, actionLabel, ...listItemProps }) => {
    const [isTaskExpanded, setTaskExpanded] = (0, element_1.useState)(expanded);
    (0, element_1.useEffect)(() => {
        setTaskExpanded(expanded);
    }, [expanded]);
    const className = (0, clsx_1.default)('fincommerce-task-list__item', {
        complete: completed,
        expanded: isTaskExpanded,
        'level-2': level === 2 && !completed,
        'level-1': level === 1 && !completed,
    });
    if (showActionButton === undefined) {
        showActionButton = expandable;
    }
    const showEllipsisMenu = ((onDismiss || onSnooze) && !completed) ||
        (onDelete && completed);
    const toggleActionVisibility = () => {
        setTaskExpanded(!isTaskExpanded);
        if (isTaskExpanded && onExpand) {
            onExpand();
        }
        if (!isTaskExpanded && onCollapse) {
            onCollapse();
        }
    };
    return ((0, element_1.createElement)(__1.ListItem, { disableGutters: true, className: className, onClick: expandable && showActionButton
            ? toggleActionVisibility
            : onClick, ...listItemProps },
        (0, element_1.createElement)(OptionalTaskTooltip, { level: level, completed: completed },
            (0, element_1.createElement)("div", { className: "fincommerce-task-list__item-before" }, level === 1 && !completed ? ((0, element_1.createElement)(notice_outline_1.default, { size: 36 })) : ((0, element_1.createElement)("div", { className: "fincommerce-task__icon" }, completed && (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.check }))))),
        (0, element_1.createElement)("div", { className: "fincommerce-task-list__item-text" },
            (0, element_1.createElement)(__1.Text, { as: "div", size: "14", lineHeight: completed ? '18px' : '20px', weight: completed ? 'normal' : '600', variant: completed ? 'body.small' : 'button' },
                (0, element_1.createElement)("span", { className: "fincommerce-task-list__item-title" },
                    title,
                    badge && ((0, element_1.createElement)("span", { className: "fincommerce-task-list__item-badge" }, badge))),
                (0, element_1.createElement)(OptionalExpansionWrapper, { expandable: expandable, expanded: isTaskExpanded },
                    (0, element_1.createElement)("div", { className: "fincommerce-task-list__item-expandable-content" },
                        content,
                        expandable && !completed && additionalInfo && ((0, element_1.createElement)("div", { className: "fincommerce-task__additional-info", dangerouslySetInnerHTML: sanitizeHTML(additionalInfo) })),
                        !completed && showActionButton && ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-task-list__item-action", isPrimary: true, onClick: (event) => {
                                event.stopPropagation();
                                action(event, { isExpanded: true });
                            } }, actionLabel || title)))),
                !expandable && !completed && additionalInfo && ((0, element_1.createElement)("div", { className: "fincommerce-task__additional-info", dangerouslySetInnerHTML: sanitizeHTML(additionalInfo) })),
                time && ((0, element_1.createElement)("div", { className: "fincommerce-task__estimated-time" }, time))),
            inProgress && inProgressLabel && ((0, element_1.createElement)("div", { className: "fincommerce-task-list__item-progress" }, inProgressLabel))),
        showEllipsisMenu && ((0, element_1.createElement)(components_2.EllipsisMenu, { label: (0, i18n_1.__)('Task Options', 'fincommerce'), className: "fincommerce-task-list__item-after", onToggle: (e) => e.stopPropagation(), renderContent: () => ((0, element_1.createElement)("div", { className: "fincommerce-task-card__section-controls" },
                onDismiss && !completed && ((0, element_1.createElement)(components_1.Button, { onClick: (e) => {
                        e.stopPropagation();
                        onDismiss();
                    } }, (0, i18n_1.__)('Dismiss', 'fincommerce'))),
                onSnooze && !completed && ((0, element_1.createElement)(components_1.Button, { onClick: (e) => {
                        e.stopPropagation();
                        onSnooze();
                    } }, (0, i18n_1.__)('Remind me later', 'fincommerce'))),
                onDelete && completed && ((0, element_1.createElement)(components_1.Button, { onClick: (e) => {
                        e.stopPropagation();
                        onDelete();
                    } }, (0, i18n_1.__)('Delete', 'fincommerce'))))) }))));
};
exports.TaskItem = TaskItem;
