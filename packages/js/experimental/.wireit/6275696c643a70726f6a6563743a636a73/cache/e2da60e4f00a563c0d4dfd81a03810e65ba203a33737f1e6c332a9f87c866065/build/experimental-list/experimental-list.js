"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentalList = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const react_transition_group_1 = require("react-transition-group");
const ExperimentalList = ({ children, listType, animation = 'none', 
// Allow passing any other property overrides that are legal on an HTML element
...otherProps }) => {
    return ((0, element_1.createElement)(react_transition_group_1.TransitionGroup, { component: listType || 'ul', className: "fincommerce-experimental-list", ...otherProps }, element_1.Children.map(children, (child) => {
        if ((0, element_1.isValidElement)(child)) {
            const { onExited, in: inTransition, enter, exit, ...remainingProps } = child.props;
            const animationProp = remainingProps.animation || animation;
            return ((0, element_1.createElement)(react_transition_group_1.CSSTransition, { timeout: 500, onExited: onExited, in: inTransition, enter: enter, exit: exit, classNames: "fincommerce-list__item" }, (0, element_1.cloneElement)(child, {
                animation: animationProp,
                ...remainingProps,
            })));
        }
        return child;
        // TODO - create a less restrictive type definition for children of react-transition-group. React.Children.map seems incompatible with the type expected by `children`.
    })));
};
exports.ExperimentalList = ExperimentalList;
