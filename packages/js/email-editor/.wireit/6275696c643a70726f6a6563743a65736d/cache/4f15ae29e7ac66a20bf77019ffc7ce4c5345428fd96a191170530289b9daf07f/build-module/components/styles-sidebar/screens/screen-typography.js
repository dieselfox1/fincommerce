import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import TypographyPanel from '../panels/typography-panel';
import ScreenHeader from './screen-header';
import { recordEventOnce } from '../../../events';
export function ScreenTypography() {
    recordEventOnce('styles_sidebar_screen_typography_opened');
    return (_jsxs(_Fragment, { children: [_jsx(ScreenHeader, { title: __('Typography', 'fincommerce'), description: __('Manage the typography settings for different elements.', 'fincommerce') }), _jsx(TypographyPanel, {})] }));
}
