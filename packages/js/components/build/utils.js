"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeHTML = exports.sortFillsByOrder = void 0;
exports.createOrderedChildren = createOrderedChildren;
/**
 * External dependencies
 */
const react_1 = require("react");
const element_1 = require("@wordpress/element");
/**
 * Returns an object with the children and props that will be used by `cloneElement`. They will change depending on the
 * type of children passed in.
 *
 * @param {Node}   children    - Node children.
 * @param {number} order       - Node order.
 * @param {Array}  props       - Fill props.
 * @param {Object} injectProps - Props to inject.
 * @return {Object} Object with the keys: children and props.
 */
function getChildrenAndProps(children, order, props, injectProps) {
    if (typeof children === 'function') {
        return {
            children: children({ ...props, order, ...injectProps }),
            props: { order, ...injectProps },
        };
    }
    else if ((0, react_1.isValidElement)(children)) {
        // This checks whether 'children' is a react element or a standard HTML element.
        if (typeof children?.type === 'function') {
            return {
                children,
                props: {
                    ...props,
                    order,
                    ...injectProps,
                },
            };
        }
        return {
            children: children,
            props: { order, ...injectProps },
        };
    }
    throw Error('Invalid children type');
}
/**
 * Ordered fill item.
 *
 * @param {Node}   children    - Node children.
 * @param {number} order       - Node order.
 * @param {Array}  props       - Fill props.
 * @param {Object} injectProps - Props to inject.
 * @return {Node} Node.
 */
function createOrderedChildren(children, order, props, injectProps) {
    const { children: childrenToRender, props: propsToRender } = getChildrenAndProps(children, order, props, injectProps);
    if (!childrenToRender || typeof childrenToRender === 'string') {
        return childrenToRender;
    }
    return (0, element_1.cloneElement)(childrenToRender, propsToRender);
}
/**
 * Sort fills by order for slot children.
 *
 * @param {Array} fills - slot's `Fill`s.
 * @return {Node} Node.
 */
const sortFillsByOrder = (fills) => {
    // Copy fills array here because its type is readonly array that doesn't have .sort method in Typescript definition.
    const sortedFills = react_1.Children.toArray(fills).sort((a, b) => {
        if (typeof a === 'object' &&
            'key' in a &&
            typeof b === 'object' &&
            'key' in b) {
            return a.props.order - b.props.order;
        }
        return 0;
    });
    return (0, element_1.createElement)(react_1.Fragment, null, sortedFills);
};
exports.sortFillsByOrder = sortFillsByOrder;
const escapeHTML = (string) => {
    return string
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;');
};
exports.escapeHTML = escapeHTML;
