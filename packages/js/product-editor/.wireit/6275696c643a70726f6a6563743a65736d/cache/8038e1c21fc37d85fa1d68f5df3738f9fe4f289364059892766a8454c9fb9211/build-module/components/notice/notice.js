import { createElement } from '@wordpress/element';
import clsx from 'clsx';
import { Button } from '@wordpress/components';
import { closeSmall } from '@wordpress/icons';
export function Notice({ title = '', content = '', className, type = 'info', children, isDismissible = false, handleDismiss = () => { }, }) {
    return (createElement("div", { className: clsx(className, type, 'fincommerce-product-notice', {
            'is-dismissible': isDismissible,
        }) },
        title && (createElement("h3", { className: "fincommerce-product-notice__title" }, title)),
        content && (createElement("p", { className: "fincommerce-product-notice__content" }, content)),
        createElement("div", { className: "fincommerce-product-notice__content" }, children),
        isDismissible && (createElement(Button, { className: "fincommerce-product-notice__dismiss", icon: closeSmall, onClick: handleDismiss }))));
}
