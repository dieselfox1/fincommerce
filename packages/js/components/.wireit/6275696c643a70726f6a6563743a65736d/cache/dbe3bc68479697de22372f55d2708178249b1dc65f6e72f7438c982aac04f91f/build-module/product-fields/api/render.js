/**
 * External dependencies
 */
import { select } from '@wordpress/data';
import { createElement } from '@wordpress/element';
import { __experimentalInputControl as InputControl } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { store as productFieldStore } from '../store';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderField(name, props) {
    const fieldConfig = select(productFieldStore).getProductField(name);
    if (fieldConfig.render) {
        return createElement(fieldConfig.render, { ...props });
    }
    if (fieldConfig.type) {
        return createElement(InputControl, { type: fieldConfig.type, ...props });
    }
    return null;
}
