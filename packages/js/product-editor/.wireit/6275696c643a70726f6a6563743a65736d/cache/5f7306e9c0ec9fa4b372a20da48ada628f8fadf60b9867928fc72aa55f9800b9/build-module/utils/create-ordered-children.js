/**
 * External dependencies
 */
import { isValidElement } from 'react';
import { cloneElement } from '@wordpress/element';
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
    else if (isValidElement(children)) {
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
    return cloneElement(childrenToRender, propsToRender);
}
export { createOrderedChildren };
