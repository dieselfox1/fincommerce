import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { typography, color, layout } from '@wordpress/icons';
import { __experimentalVStack as VStack, // eslint-disable-line
Card, CardBody, CardMedia, __experimentalItemGroup as ItemGroup, // eslint-disable-line
__experimentalItem as Item, // eslint-disable-line
__experimentalHStack as HStack, // eslint-disable-line
__experimentalNavigatorButton as NavigatorButton, // eslint-disable-line
Icon, FlexItem, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { Preview } from './preview';
import { recordEvent } from '../../../events';
export function ScreenRoot() {
    return (_jsx(Card, { size: "small", className: "edit-site-global-styles-screen-root", variant: "primary", children: _jsx(CardBody, { children: _jsxs(VStack, { spacing: 4, children: [_jsx(Card, { children: _jsx(CardMedia, { children: _jsx(Preview, {}) }) }), _jsxs(ItemGroup, { children: [_jsx(NavigatorButton, { path: "/typography", onClick: () => recordEvent('styles_sidebar_navigation_click', { path: 'typography' }), children: _jsx(Item, { children: _jsxs(HStack, { justify: "flex-start", children: [_jsx(Icon, { icon: typography, size: 24 }), _jsx(FlexItem, { children: __('Typography', 'fincommerce') })] }) }) }), _jsx(NavigatorButton, { path: "/colors", onClick: () => recordEvent('styles_sidebar_navigation_click', { path: 'colors' }), children: _jsx(Item, { children: _jsxs(HStack, { justify: "flex-start", children: [_jsx(Icon, { icon: color, size: 24 }), _jsx(FlexItem, { children: __('Colors', 'fincommerce') })] }) }) }), _jsx(NavigatorButton, { path: "/layout", onClick: () => recordEvent('styles_sidebar_navigation_click', { path: 'layout' }), children: _jsx(Item, { children: _jsxs(HStack, { justify: "flex-start", children: [_jsx(Icon, { icon: layout, size: 24 }), _jsx(FlexItem, { children: __('Layout', 'fincommerce') })] }) }) })] })] }) }) }));
}
