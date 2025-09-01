import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { DimensionsPanel } from '../panels/dimensions-panel';
import { ScreenHeader } from './screen-header';
import { recordEventOnce } from '../../../events';
export function ScreenLayout() {
    recordEventOnce('styles_sidebar_screen_layout_opened');
    return (_jsxs(_Fragment, { children: [_jsx(ScreenHeader, { title: __('Layout', 'fincommerce') }), _jsx(DimensionsPanel, {})] }));
}
