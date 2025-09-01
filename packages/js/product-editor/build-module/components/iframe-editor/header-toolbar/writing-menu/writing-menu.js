/**
 * External dependencies
 */
import { useDispatch } from '@wordpress/data';
import { MenuGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';
import { createElement } from '@wordpress/element';
import { PreferenceToggleMenuItem, store as preferencesStore,
// @ts-expect-error missing types.
 } from '@wordpress/preferences';
export function WritingMenu() {
    const { set: setPreference } = useDispatch(preferencesStore);
    const turnOffDistractionFree = () => {
        setPreference('core', 'distractionFree', false);
    };
    const isLargeViewport = useViewportMatch('medium');
    if (!isLargeViewport) {
        return null;
    }
    return (createElement(MenuGroup, { label: __('View', 'fincommerce') },
        createElement(PreferenceToggleMenuItem, { scope: "core", name: "fixedToolbar", onToggle: turnOffDistractionFree, label: __('Top toolbar', 'fincommerce'), info: __('Access all block and document tools in a single place', 'fincommerce'), messageActivated: __('Top toolbar activated', 'fincommerce'), messageDeactivated: __('Top toolbar deactivated', 'fincommerce') })));
}
