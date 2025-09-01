import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { chevronLeft } from '@wordpress/icons';
import { __experimentalHStack as HStack, // eslint-disable-line
__experimentalVStack as VStack, // eslint-disable-line
__experimentalSpacer as Spacer, // eslint-disable-line
__experimentalHeading as Heading, // eslint-disable-line
__experimentalView as View, // eslint-disable-line
 } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { Navigator } from '../navigator';
/**
 * Component for displaying the screen header and optional description based on site editor component:
 * https://github.com/WordPress/gutenberg/blob/7fa03fafeb421ab4c3604564211ce6007cc38e84/packages/edit-site/src/components/global-styles/header.js
 *
 * @param root0
 * @param root0.title
 * @param root0.description
 * @param root0.onBack
 */
export function ScreenHeader({ title, description, onBack }) {
    return (_jsxs(VStack, { spacing: 0, children: [_jsx(View, { children: _jsx(Spacer, { marginBottom: 0, paddingX: 4, paddingY: 3, children: _jsxs(HStack, { spacing: 2, children: [_jsx(Navigator.BackButton, { style: { minWidth: 24, padding: 0 }, icon: chevronLeft, size: "small", "aria-label": __('Navigate to the previous view', 'fincommerce'), onClick: onBack }), _jsx(Spacer, { children: _jsx(Heading, { className: "fincommerce-email-editor-styles-header", level: 2, size: 13, children: title }) })] }) }) }), description && (_jsx("p", { className: "fincommerce-email-editor-styles-header-description", children: description }))] }));
}
export default ScreenHeader;
