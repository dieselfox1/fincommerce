/**
 * External dependencies
 */
function getFirstChild(currentHeading) {
    const parentTreeItem = currentHeading?.closest('.experimental-fincommerce-tree-item');
    const firstSubTreeItem = parentTreeItem?.querySelector('.experimental-fincommerce-tree > .experimental-fincommerce-tree-item');
    const label = firstSubTreeItem?.querySelector('.experimental-fincommerce-tree-item__heading > .experimental-fincommerce-tree-item__label');
    return label ?? null;
}
function getFirstAncestor(currentHeading) {
    const parentTree = currentHeading?.closest('.experimental-fincommerce-tree');
    const grandParentTreeItem = parentTree?.closest('.experimental-fincommerce-tree-item');
    const label = grandParentTreeItem?.querySelector('.experimental-fincommerce-tree-item__heading > .experimental-fincommerce-tree-item__label');
    return label ?? null;
}
function getAllHeadings(currentHeading) {
    const rootTree = currentHeading.closest('.experimental-fincommerce-tree--level-1');
    return rootTree?.querySelectorAll('.experimental-fincommerce-tree-item > .experimental-fincommerce-tree-item__heading');
}
const step = {
    ArrowDown: 1,
    ArrowUp: -1,
};
function getNextFocusableElement(currentHeading, code) {
    const headingsNodeList = getAllHeadings(currentHeading);
    if (!headingsNodeList)
        return null;
    let currentHeadingIndex = 0;
    for (const heading of headingsNodeList.values()) {
        if (heading === currentHeading)
            break;
        currentHeadingIndex++;
    }
    if (currentHeadingIndex < 0 ||
        currentHeadingIndex >= headingsNodeList.length) {
        return null;
    }
    const heading = headingsNodeList.item(currentHeadingIndex + (step[code] ?? 0));
    return heading?.querySelector('.experimental-fincommerce-tree-item__label');
}
function getFirstFocusableElement(currentHeading) {
    const headingsNodeList = getAllHeadings(currentHeading);
    if (!headingsNodeList)
        return null;
    return headingsNodeList
        .item(0)
        .querySelector('.experimental-fincommerce-tree-item__label');
}
function getLastFocusableElement(currentHeading) {
    const headingsNodeList = getAllHeadings(currentHeading);
    if (!headingsNodeList)
        return null;
    return headingsNodeList
        .item(headingsNodeList.length - 1)
        .querySelector('.experimental-fincommerce-tree-item__label');
}
export function useKeyboard({ item, isExpanded, onExpand, onCollapse, onToggleExpand, onLastItemLoop, onFirstItemLoop, }) {
    function onKeyDown(event) {
        if (event.code === 'ArrowRight') {
            event.preventDefault();
            if (item.children.length > 0) {
                if (isExpanded) {
                    const element = getFirstChild(event.currentTarget);
                    return element?.focus();
                }
                onExpand();
            }
        }
        if (event.code === 'ArrowLeft') {
            event.preventDefault();
            if (!isExpanded && item.parent) {
                const element = getFirstAncestor(event.currentTarget);
                return element?.focus();
            }
            if (item.children.length > 0) {
                onCollapse();
            }
        }
        if (event.code === 'Enter') {
            event.preventDefault();
            if (item.children.length > 0) {
                onToggleExpand();
            }
        }
        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            event.preventDefault();
            const element = getNextFocusableElement(event.currentTarget, event.code);
            element?.focus();
            if (event.code === 'ArrowDown' && !element && onLastItemLoop) {
                onLastItemLoop(event);
            }
            if (event.code === 'ArrowUp' && !element && onFirstItemLoop) {
                onFirstItemLoop(event);
            }
        }
        if (event.code === 'Home') {
            event.preventDefault();
            const element = getFirstFocusableElement(event.currentTarget);
            element?.focus();
        }
        if (event.code === 'End') {
            event.preventDefault();
            const element = getLastFocusableElement(event.currentTarget);
            element?.focus();
        }
    }
    return { onKeyDown };
}
