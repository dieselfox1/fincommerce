/**
 * External dependencies
 */
import { createElement, Children, cloneElement, isValidElement, } from '@wordpress/element';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
export const ExperimentalList = ({ children, listType, animation = 'none', 
// Allow passing any other property overrides that are legal on an HTML element
...otherProps }) => {
    return (createElement(TransitionGroup, { component: listType || 'ul', className: "fincommerce-experimental-list", ...otherProps }, Children.map(children, (child) => {
        if (isValidElement(child)) {
            const { onExited, in: inTransition, enter, exit, ...remainingProps } = child.props;
            const animationProp = remainingProps.animation || animation;
            return (createElement(CSSTransition, { timeout: 500, onExited: onExited, in: inTransition, enter: enter, exit: exit, classNames: "fincommerce-list__item" }, cloneElement(child, {
                animation: animationProp,
                ...remainingProps,
            })));
        }
        return child;
        // TODO - create a less restrictive type definition for children of react-transition-group. React.Children.map seems incompatible with the type expected by `children`.
    })));
};
