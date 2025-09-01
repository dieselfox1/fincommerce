/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { Level } from './context';
/**
 * The section wrapper, used to indicate a sub-section (and change the header level context).
 */
export const Section = ({ component, children, ...props }) => {
    const Component = component || 'div';
    return (createElement(Level.Consumer, null, (level) => (createElement(Level.Provider, { value: level + 1 }, component === false ? (children) : (createElement(Component, { ...props }, children))))));
};
