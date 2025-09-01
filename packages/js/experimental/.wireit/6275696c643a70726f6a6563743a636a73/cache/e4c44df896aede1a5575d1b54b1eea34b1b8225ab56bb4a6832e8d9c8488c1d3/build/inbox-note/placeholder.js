"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxNotePlaceholder = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const InboxNotePlaceholder = ({ className }) => {
    return ((0, element_1.createElement)("div", { className: `fincommerce-inbox-message is-placeholder ${className}`, "aria-hidden": true },
        (0, element_1.createElement)("div", { className: "fincommerce-inbox-message__wrapper" },
            (0, element_1.createElement)("div", { className: "fincommerce-inbox-message__content" },
                (0, element_1.createElement)("div", { className: "fincommerce-inbox-message__date" },
                    (0, element_1.createElement)("div", { className: "sixth-line" })),
                (0, element_1.createElement)("div", { className: "fincommerce-inbox-message__title" },
                    (0, element_1.createElement)("div", { className: "line" }),
                    (0, element_1.createElement)("div", { className: "line" })),
                (0, element_1.createElement)("div", { className: "fincommerce-inbox-message__text" },
                    (0, element_1.createElement)("div", { className: "line" }),
                    (0, element_1.createElement)("div", { className: "third-line" }))),
            (0, element_1.createElement)("div", { className: "fincommerce-inbox-message__actions" },
                (0, element_1.createElement)("div", { className: "fifth-line" }),
                (0, element_1.createElement)("div", { className: "fifth-line" })))));
};
exports.InboxNotePlaceholder = InboxNotePlaceholder;
