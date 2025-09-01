import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { Button, __unstableMotion as motion } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Icon, arrowLeft, wordpress } from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { BackButton } from '../../private-apis';
import { recordEvent } from '../../events';
import { storeName } from '../../store';
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
export const BackButtonContent = () => {
    const { urls } = useSelect((select) => ({
        urls: select(storeName).getUrls(),
    }), []);
    function backAction() {
        if (urls.listings) {
            window.location.href = urls.back;
        }
    }
    return (_jsx(BackButton, { children: ({ length }) => length <= 1 && (_jsxs(motion.div, { className: "fincommerce-email-editor__view-mode-toggle", transition: {
                duration: 0.2,
            }, animate: "edit", initial: "edit", whileHover: "hover", whileTap: "tap", children: [_jsx(Button, { label: __('Close editor', 'fincommerce'), showTooltip: true, tooltipPosition: "middle right", onClick: () => {
                        recordEvent('header_close_button_clicked');
                        const action = applyFilters('fincommerce_email_editor_close_action_callback', backAction);
                        action();
                    }, children: _jsx(motion.div, { variants: siteIconVariants, children: _jsx("div", { className: "fincommerce-email-editor__view-mode-toggle-icon", children: _jsx(Icon, { className: "fincommerce-email-editor-icon__icon", icon: wordpress, size: 48 }) }) }) }), _jsx(motion.div, { className: "fincommerce-email-editor-icon", variants: toggleHomeIconVariants, children: _jsx(Icon, { icon: arrowLeft }) })] })) }));
};
