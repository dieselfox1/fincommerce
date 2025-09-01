/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ErrorVariationsImage } from '../../../images/error-variations-image';
import { EmptyVariationsImage } from '../../../images/empty-variations-image';
export function EmptyOrErrorTableState({ message, actionText, isError, onActionClick, }) {
    return (createElement("div", { className: "fincommerce-variations-table-error-or-empty-state" },
        isError ? createElement(ErrorVariationsImage, null) : createElement(EmptyVariationsImage, null),
        createElement("p", { className: "fincommerce-variations-table-error-or-empty-state__message" }, isError
            ? __('We couldn’t load the variations', 'fincommerce')
            : message ?? __('No variations yet', 'fincommerce')),
        createElement("div", { className: "fincommerce-variations-table-error-or-empty-state__actions" },
            createElement(Button, { variant: "link", onClick: onActionClick }, isError
                ? __('Try again', 'fincommerce')
                : actionText ??
                    __('Generate from options', 'fincommerce')))));
}
