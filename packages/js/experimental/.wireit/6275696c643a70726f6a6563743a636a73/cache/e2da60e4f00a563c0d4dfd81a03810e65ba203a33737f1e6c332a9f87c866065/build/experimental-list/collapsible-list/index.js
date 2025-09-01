"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentalCollapsibleList = void 0;
/**
 * External dependencies
 */
const icons_1 = require("@wordpress/icons");
const element_1 = require("@wordpress/element");
const react_transition_group_1 = require("react-transition-group");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const experimental_list_item_1 = require("../experimental-list-item");
const experimental_list_1 = require("../experimental-list");
const defaultStyle = {
    transitionProperty: 'max-height',
    transitionDuration: '500ms',
    maxHeight: 0,
    overflow: 'hidden',
};
function getContainerHeight(collapseContainer) {
    let containerHeight = 0;
    if (collapseContainer) {
        for (const child of collapseContainer.children) {
            containerHeight += child.clientHeight;
            const style = window.getComputedStyle(child);
            containerHeight += parseInt(style.marginTop, 10) || 0;
            containerHeight += parseInt(style.marginBottom, 10) || 0;
        }
    }
    return containerHeight;
}
/**
 * This functions returns a new list of shown children depending on the new children updates.
 * If one is removed, it will remove it from the show array.
 * If one is added, it will add it back to the shown list, making use of the new children list to keep order.
 *
 * @param {Array.<import('react').ReactElement>} currentChildren      a list of the current children.
 * @param {Array.<import('react').ReactElement>} currentShownChildren a list of the current shown children.
 * @param {Array.<import('react').ReactElement>} newChildren          a list of the new children.
 * @return {Array.<import('react').ReactElement>} new list of children that should be shown.
 */
function getUpdatedShownChildren(currentChildren, currentShownChildren, newChildren) {
    if (newChildren.length < currentChildren.length) {
        const newChildrenKeys = newChildren.map((child) => child.key);
        // Filter out removed child
        return currentShownChildren.filter((item) => item.key && newChildrenKeys.includes(item.key));
    }
    const currentShownChildrenKeys = currentShownChildren.map((child) => child.key);
    const currentChildrenKeys = currentChildren.map((child) => child.key);
    // Add new child back in.
    return newChildren.filter((child) => child.key &&
        (currentShownChildrenKeys.includes(child.key) ||
            !currentChildrenKeys.includes(child.key)));
}
const getTransitionStyle = (state, isCollapsed, elementRef) => {
    let maxHeight = 0;
    if ((state === 'entered' || state === 'entering') && elementRef) {
        maxHeight = getContainerHeight(elementRef);
    }
    const styles = {
        ...defaultStyle,
        maxHeight,
    };
    // only include transition styles when entering or exiting.
    if (state !== 'entering' && state !== 'exiting') {
        delete styles.transitionDuration;
        delete styles.transition;
        delete styles.transitionProperty;
    }
    // Remove maxHeight when entered, so we do not need to worry about nested items changing height while expanded.
    if (state === 'entered' && !isCollapsed) {
        delete styles.maxHeight;
    }
    return styles;
};
const ExperimentalCollapsibleList = ({ children, collapsed = true, collapseLabel, expandLabel, show = 0, onCollapse, onExpand, direction = 'up', ...listProps }) => {
    const [isCollapsed, setCollapsed] = (0, element_1.useState)(collapsed);
    const [isTransitionComponentCollapsed, setTransitionComponentCollapsed] = (0, element_1.useState)(collapsed);
    const [footerLabels, setFooterLabels] = (0, element_1.useState)({
        collapse: collapseLabel,
        expand: expandLabel,
    });
    const [displayedChildren, setDisplayedChildren] = (0, element_1.useState)({
        all: [],
        shown: [],
        hidden: [],
    });
    const collapseContainerRef = (0, element_1.useRef)(null);
    const updateChildren = () => {
        let shownChildren = [];
        const allChildren = element_1.Children.map(children, (child) => (0, element_1.isValidElement)(child) && 'key' in child ? child : null) || [];
        let hiddenChildren = allChildren;
        if (show > 0) {
            shownChildren = allChildren.slice(0, show);
            hiddenChildren = allChildren.slice(show);
        }
        if (hiddenChildren.length > 0) {
            // Only update when footer will be shown, this way it won't update mid transition if the outer component
            // updates the label as well.
            setFooterLabels({ expand: expandLabel, collapse: collapseLabel });
        }
        setDisplayedChildren({
            all: allChildren,
            shown: shownChildren,
            hidden: hiddenChildren,
        });
    };
    // This allows for an extra render cycle that adds the maxHeight back in before the exiting transition.
    // This way the exiting transition still works correctly.
    (0, element_1.useEffect)(() => {
        setTransitionComponentCollapsed(isCollapsed);
    }, [isCollapsed]);
    (0, element_1.useEffect)(() => {
        const allChildren = element_1.Children.map(children, (child) => (0, element_1.isValidElement)(child) && 'key' in child ? child : null) || [];
        if (displayedChildren.all.length > 0 &&
            isCollapsed &&
            listProps.animation !== 'none') {
            setDisplayedChildren({
                ...displayedChildren,
                shown: getUpdatedShownChildren(displayedChildren.all, displayedChildren.shown, allChildren),
            });
            // Update the hidden children after the remove/add transition is done, making the transition less busy.
            setTimeout(() => {
                updateChildren();
            }, 500);
        }
        else {
            updateChildren();
        }
    }, [children]);
    const triggerCallbacks = (newCollapseValue) => {
        if (onCollapse && newCollapseValue) {
            onCollapse();
        }
        if (onExpand && !newCollapseValue) {
            onExpand();
        }
    };
    const clickHandler = (0, element_1.useCallback)(() => {
        setCollapsed(!isCollapsed);
        triggerCallbacks(!isCollapsed);
    }, [isCollapsed]);
    const listClasses = (0, clsx_1.default)(listProps.className || '', 'fincommerce-experimental-list');
    const wrapperClasses = (0, clsx_1.default)({
        'fincommerce-experimental-list-wrapper': !isCollapsed,
    });
    const hiddenChildren = displayedChildren.hidden.length > 0 ? ((0, element_1.createElement)(experimental_list_item_1.ExperimentalListItem, { key: "collapse-item", className: "list-item-collapse", onClick: clickHandler, animation: "none", disableGutters: true },
        (0, element_1.createElement)("p", null, isCollapsed
            ? footerLabels.expand
            : footerLabels.collapse),
        (0, element_1.createElement)(icons_1.Icon, { className: "list-item-collapse__icon", size: 30, icon: isCollapsed ? icons_1.chevronDown : icons_1.chevronUp }))) : null;
    return ((0, element_1.createElement)(experimental_list_1.ExperimentalList, { ...listProps, className: listClasses }, [
        direction === 'down' && hiddenChildren,
        ...displayedChildren.shown,
        (0, element_1.createElement)(react_transition_group_1.Transition, { key: "remaining-children", timeout: 500, in: !isTransitionComponentCollapsed, mountOnEnter: true, unmountOnExit: false }, (state) => {
            const transitionStyles = getTransitionStyle(state, isCollapsed, collapseContainerRef.current);
            return ((0, element_1.createElement)("div", { className: wrapperClasses, ref: collapseContainerRef, style: transitionStyles },
                (0, element_1.createElement)(react_transition_group_1.TransitionGroup, { className: "fincommerce-experimental-list" }, element_1.Children.map(displayedChildren.hidden, (child) => {
                    const { onExited, in: inTransition, enter, exit, ...remainingProps } = child.props;
                    const animationProp = remainingProps.animation ||
                        listProps.animation;
                    return ((0, element_1.createElement)(react_transition_group_1.CSSTransition, { key: child.key, timeout: 500, onExited: onExited, in: inTransition, enter: enter, exit: exit, classNames: "fincommerce-list__item" }, (0, element_1.cloneElement)(child, {
                        animation: animationProp,
                        ...remainingProps,
                    })));
                }))));
        }),
        direction === 'up' && hiddenChildren,
    ]));
};
exports.ExperimentalCollapsibleList = ExperimentalCollapsibleList;
