/**
 * External dependencies
 */
import { createElement, Fragment, useEffect, useState, } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, check } from '@wordpress/icons';
import { Button, Tooltip } from '@wordpress/components';
import NoticeOutline from 'gridicons/dist/notice-outline';
import { EllipsisMenu } from '@fincommerce/components';
import clsx from 'clsx';
import { sanitize } from 'dompurify';
/**
 * Internal dependencies
 */
import { Text, ListItem } from '../../';
import { VerticalCSSTransition } from '../../vertical-css-transition';
const ALLOWED_TAGS = ['a', 'b', 'em', 'i', 'strong', 'p', 'br'];
const ALLOWED_ATTR = ['target', 'href', 'rel', 'name', 'download'];
const sanitizeHTML = (html) => {
    return {
        __html: sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR }),
    };
};
const OptionalTaskTooltip = ({ level, completed, children, }) => {
    let tooltip = '';
    if (level === 1 && !completed) {
        tooltip = __('This task is required to keep your store running', 'fincommerce');
    }
    else if (level === 2 && !completed) {
        tooltip = __('This task is required to set up your extension', 'fincommerce');
    }
    if (tooltip === '') {
        return children;
    }
    return createElement(Tooltip, { text: tooltip }, children);
};
const OptionalExpansionWrapper = ({ children, expandable, expanded, }) => {
    if (!expandable) {
        return expanded ? createElement(Fragment, null, children) : null;
    }
    return (createElement(VerticalCSSTransition, { timeout: 500, in: expanded, classNames: "fincommerce-task-list__item-expandable-content", defaultStyle: {
            transitionProperty: 'max-height, opacity',
        } }, children));
};
export const TaskItem = ({ completed, inProgress, inProgressLabel, title, badge, onDelete, onCollapse, onDismiss, onSnooze, onExpand, onClick, additionalInfo, time, content, expandable = false, expanded = false, showActionButton, level = 3, action, actionLabel, ...listItemProps }) => {
    const [isTaskExpanded, setTaskExpanded] = useState(expanded);
    useEffect(() => {
        setTaskExpanded(expanded);
    }, [expanded]);
    const className = clsx('fincommerce-task-list__item', {
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
    return (createElement(ListItem, { disableGutters: true, className: className, onClick: expandable && showActionButton
            ? toggleActionVisibility
            : onClick, ...listItemProps },
        createElement(OptionalTaskTooltip, { level: level, completed: completed },
            createElement("div", { className: "fincommerce-task-list__item-before" }, level === 1 && !completed ? (createElement(NoticeOutline, { size: 36 })) : (createElement("div", { className: "fincommerce-task__icon" }, completed && createElement(Icon, { icon: check }))))),
        createElement("div", { className: "fincommerce-task-list__item-text" },
            createElement(Text, { as: "div", size: "14", lineHeight: completed ? '18px' : '20px', weight: completed ? 'normal' : '600', variant: completed ? 'body.small' : 'button' },
                createElement("span", { className: "fincommerce-task-list__item-title" },
                    title,
                    badge && (createElement("span", { className: "fincommerce-task-list__item-badge" }, badge))),
                createElement(OptionalExpansionWrapper, { expandable: expandable, expanded: isTaskExpanded },
                    createElement("div", { className: "fincommerce-task-list__item-expandable-content" },
                        content,
                        expandable && !completed && additionalInfo && (createElement("div", { className: "fincommerce-task__additional-info", dangerouslySetInnerHTML: sanitizeHTML(additionalInfo) })),
                        !completed && showActionButton && (createElement(Button, { className: "fincommerce-task-list__item-action", isPrimary: true, onClick: (event) => {
                                event.stopPropagation();
                                action(event, { isExpanded: true });
                            } }, actionLabel || title)))),
                !expandable && !completed && additionalInfo && (createElement("div", { className: "fincommerce-task__additional-info", dangerouslySetInnerHTML: sanitizeHTML(additionalInfo) })),
                time && (createElement("div", { className: "fincommerce-task__estimated-time" }, time))),
            inProgress && inProgressLabel && (createElement("div", { className: "fincommerce-task-list__item-progress" }, inProgressLabel))),
        showEllipsisMenu && (createElement(EllipsisMenu, { label: __('Task Options', 'fincommerce'), className: "fincommerce-task-list__item-after", onToggle: (e) => e.stopPropagation(), renderContent: () => (createElement("div", { className: "fincommerce-task-card__section-controls" },
                onDismiss && !completed && (createElement(Button, { onClick: (e) => {
                        e.stopPropagation();
                        onDismiss();
                    } }, __('Dismiss', 'fincommerce'))),
                onSnooze && !completed && (createElement(Button, { onClick: (e) => {
                        e.stopPropagation();
                        onSnooze();
                    } }, __('Remind me later', 'fincommerce'))),
                onDelete && completed && (createElement(Button, { onClick: (e) => {
                        e.stopPropagation();
                        onDelete();
                    } }, __('Delete', 'fincommerce'))))) }))));
};
