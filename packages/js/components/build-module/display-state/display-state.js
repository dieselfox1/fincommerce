/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
export const DisplayState = ({ state = 'visible', children, ...props }) => {
    if (state === 'visible') {
        return createElement("div", { ...props }, children);
    }
    if (state === 'visually-hidden') {
        return (createElement("div", { ...props, style: { display: 'none' } }, children));
    }
    return null;
};
