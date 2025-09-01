import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { __experimentalItemGroup as ItemGroup, // eslint-disable-line
__experimentalItem as Item, // eslint-disable-line
__experimentalVStack as VStack, // eslint-disable-line
__experimentalHStack as HStack, // eslint-disable-line
__experimentalHeading as Heading, // eslint-disable-line
__experimentalNavigatorButton as NavigatorButton, // eslint-disable-line
FlexItem, Card, CardBody, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { useEmailStyles } from '../../../hooks';
import { getElementStyles } from '../utils';
import { recordEvent } from '../../../events';
function ElementItem({ element, label }) {
    const { styles } = useEmailStyles();
    const elementStyles = getElementStyles(styles, element, null, true);
    const { fontFamily, fontStyle, fontWeight, letterSpacing, textDecoration, textTransform, } = elementStyles.typography;
    const textColor = elementStyles.color?.text || 'inherit';
    const background = elementStyles.color?.background || '#f0f0f0';
    const navigationButtonLabel = sprintf(
    // translators: %s: is a subset of Typography, e.g., 'text' or 'links'.
    __('Typography %s styles', 'fincommerce'), label);
    return (_jsx(Item, { children: _jsx(NavigatorButton, { path: `/typography/${element}`, "aria-label": navigationButtonLabel, onClick: () => recordEvent('styles_sidebar_screen_typography_button_click', {
                element,
                label,
                path: `typography/${element}`,
            }), children: _jsxs(HStack, { justify: "flex-start", children: [_jsx(FlexItem, { className: "edit-site-global-styles-screen-typography__indicator", style: {
                            fontFamily: fontFamily ?? 'serif',
                            background,
                            color: textColor,
                            fontStyle: fontStyle ?? 'normal',
                            fontWeight: fontWeight ?? 'normal',
                            letterSpacing: letterSpacing ?? 'normal',
                            textDecoration: textDecoration ??
                                (element === 'link' ? 'underline' : 'none'),
                            textTransform: textTransform ?? 'none',
                        }, children: "Aa" }), _jsx(FlexItem, { children: label })] }) }) }));
}
export function TypographyPanel() {
    return (_jsx(Card, { size: "small", variant: "primary", isBorderless: true, children: _jsx(CardBody, { children: _jsxs(VStack, { spacing: 3, children: [_jsx(Heading, { level: 3, className: "edit-site-global-styles-subtitle", children: __('Elements', 'fincommerce') }), _jsxs(ItemGroup, { isBordered: true, isSeparated: true, size: "small", children: [_jsx(ElementItem, { element: "text", label: __('Text', 'fincommerce') }), _jsx(ElementItem, { element: "link", label: __('Links', 'fincommerce') }), _jsx(ElementItem, { element: "heading", label: __('Headings', 'fincommerce') }), _jsx(ElementItem, { element: "button", label: __('Buttons', 'fincommerce') })] })] }) }) }));
}
export default TypographyPanel;
