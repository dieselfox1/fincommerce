/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { Spinner, Button } from '@wordpress/components';
import { close } from '@wordpress/icons';
export const Suffix = ({ isLoading, isFocused, value, onRemove, }) => {
    if (isLoading) {
        return createElement(Spinner, null);
    }
    if (!isFocused && value) {
        return (createElement(Button, { icon: close, onClick: onRemove, iconSize: 16, size: "compact" }));
    }
    return null;
};
