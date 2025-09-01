/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
const InboxNotePlaceholder = ({ className }) => {
    return (createElement("div", { className: `fincommerce-inbox-message is-placeholder ${className}`, "aria-hidden": true },
        createElement("div", { className: "fincommerce-inbox-message__wrapper" },
            createElement("div", { className: "fincommerce-inbox-message__content" },
                createElement("div", { className: "fincommerce-inbox-message__date" },
                    createElement("div", { className: "sixth-line" })),
                createElement("div", { className: "fincommerce-inbox-message__title" },
                    createElement("div", { className: "line" }),
                    createElement("div", { className: "line" })),
                createElement("div", { className: "fincommerce-inbox-message__text" },
                    createElement("div", { className: "line" }),
                    createElement("div", { className: "third-line" }))),
            createElement("div", { className: "fincommerce-inbox-message__actions" },
                createElement("div", { className: "fifth-line" }),
                createElement("div", { className: "fifth-line" })))));
};
export { InboxNotePlaceholder };
