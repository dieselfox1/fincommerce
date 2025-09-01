"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentalListItem = void 0;
/**
 * External dependencies
 */
const react_transition_group_1 = require("react-transition-group");
const element_1 = require("@wordpress/element");
const keycodes_1 = require("@wordpress/keycodes");
const clsx_1 = __importDefault(require("clsx"));
function handleKeyDown(event, onClick) {
    if (typeof onClick === 'function' && event.keyCode === keycodes_1.ENTER) {
        onClick(event);
    }
}
const ExperimentalListItem = ({ children, disableGutters = false, animation = 'none', className = '', 
// extract out the props that must be passed down from TransitionGroup
exit, enter, onExited, 
// in is a TS reserved keyword so can't be a variable name
in: transitionIn, ...otherProps }) => {
    // for styling purposes only
    const hasAction = !!otherProps?.onClick;
    const roleProps = hasAction
        ? {
            role: 'button',
            onKeyDown: (e) => handleKeyDown(e, otherProps.onClick),
            tabIndex: 0,
        }
        : {};
    const tagClasses = (0, clsx_1.default)({
        'has-action': hasAction,
        'has-gutters': !disableGutters,
        // since there is only one valid animation right now, any other value disables them.
        'transitions-disabled': animation !== 'slide-right',
    });
    return ((0, element_1.createElement)(react_transition_group_1.CSSTransition, { timeout: 500, classNames: className || 'fincommerce-list__item', in: transitionIn, exit: exit, enter: enter, onExited: onExited },
        (0, element_1.createElement)("li", { ...roleProps, ...otherProps, className: `fincommerce-experimental-list__item ${tagClasses} ${className}` }, children)));
};
exports.ExperimentalListItem = ExperimentalListItem;
