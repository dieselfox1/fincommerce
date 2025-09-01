"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackButtonContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const hooks_1 = require("@wordpress/hooks");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const private_apis_1 = require("../../private-apis");
const events_1 = require("../../events");
const store_1 = require("../../store");
const toggleHomeIconVariants = {
    edit: {
        opacity: 0,
        scale: 0.2,
    },
    hover: {
        opacity: 1,
        scale: 1,
        clipPath: 'inset( 22% round 2px )',
    },
};
const siteIconVariants = {
    edit: {
        clipPath: 'inset(0% round 0px)',
    },
    hover: {
        clipPath: 'inset( 22% round 2px )',
    },
    tap: {
        clipPath: 'inset(0% round 0px)',
    },
};
/**
 * Back button content component with animation effects.
 */
const BackButtonContent = () => {
    const { urls } = (0, data_1.useSelect)((select) => ({
        urls: select(store_1.storeName).getUrls(),
    }), []);
    function backAction() {
        if (urls.listings) {
            window.location.href = urls.back;
        }
    }
    return ((0, jsx_runtime_1.jsx)(private_apis_1.BackButton, { children: ({ length }) => length <= 1 && ((0, jsx_runtime_1.jsxs)(components_1.__unstableMotion.div, { className: "fincommerce-email-editor__view-mode-toggle", transition: {
                duration: 0.2,
            }, animate: "edit", initial: "edit", whileHover: "hover", whileTap: "tap", children: [(0, jsx_runtime_1.jsx)(components_1.Button, { label: (0, i18n_1.__)('Close editor', 'fincommerce'), showTooltip: true, tooltipPosition: "middle right", onClick: () => {
                        (0, events_1.recordEvent)('header_close_button_clicked');
                        const action = (0, hooks_1.applyFilters)('fincommerce_email_editor_close_action_callback', backAction);
                        action();
                    }, children: (0, jsx_runtime_1.jsx)(components_1.__unstableMotion.div, { variants: siteIconVariants, children: (0, jsx_runtime_1.jsx)("div", { className: "fincommerce-email-editor__view-mode-toggle-icon", children: (0, jsx_runtime_1.jsx)(icons_1.Icon, { className: "fincommerce-email-editor-icon__icon", icon: icons_1.wordpress, size: 48 }) }) }) }), (0, jsx_runtime_1.jsx)(components_1.__unstableMotion.div, { className: "fincommerce-email-editor-icon", variants: toggleHomeIconVariants, children: (0, jsx_runtime_1.jsx)(icons_1.Icon, { icon: icons_1.arrowLeft }) })] })) }));
};
exports.BackButtonContent = BackButtonContent;
