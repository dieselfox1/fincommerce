/**
 * External dependencies
 */
import { CSSTransition } from 'react-transition-group';
import { createElement } from '@wordpress/element';
import { ENTER } from '@wordpress/keycodes';
import clsx from 'clsx';
function handleKeyDown(event, onClick) {
    if (typeof onClick === 'function' && event.keyCode === ENTER) {
        onClick(event);
    }
}
export const ExperimentalListItem = ({ children, disableGutters = false, animation = 'none', className = '', 
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
    const tagClasses = clsx({
        'has-action': hasAction,
        'has-gutters': !disableGutters,
        // since there is only one valid animation right now, any other value disables them.
        'transitions-disabled': animation !== 'slide-right',
    });
    return (createElement(CSSTransition, { timeout: 500, classNames: className || 'fincommerce-list__item', in: transitionIn, exit: exit, enter: enter, onExited: onExited },
        createElement("li", { ...roleProps, ...otherProps, className: `fincommerce-experimental-list__item ${tagClasses} ${className}` }, children)));
};
