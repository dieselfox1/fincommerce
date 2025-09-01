/**
 * External dependencies
 */
import { createElement, lazy } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { SIDEBAR_COMPLEMENTARY_AREA_SCOPE } from '../../constants';
const ComplementaryArea = lazy(() => 
// @ts-expect-error No types for this exist yet
import('@wordpress/interface').then((module) => ({
    default: module.ComplementaryArea,
})));
export function PluginSidebar({ className, ...props }) {
    return (createElement(ComplementaryArea
    // @ts-expect-error No types for this exist yet
    , { 
        // @ts-expect-error No types for this exist yet
        panelClassName: className, className: "fincommerce-iframe-editor__sidebar", scope: SIDEBAR_COMPLEMENTARY_AREA_SCOPE, ...props }));
}
