/**
 * External dependencies
 */
import { createElement, memo, forwardRef } from '@wordpress/element';
import clsx from 'clsx';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';
import { filterURLForDisplay } from '@wordpress/url';
import { Button, __experimentalHStack as HStack, VisuallyHidden, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import SiteIcon from './site-icon';
import { unlock } from '../../lock-unlock';
const SiteHub = memo(forwardRef(({ isTransparent }, ref) => {
    const { dashboardLink, homeUrl, siteTitle } = useSelect((select) => {
        const { getSettings } = unlock(select('core/edit-site'));
        const { getSite, getUnstableBase, // Site index.
         } = select(coreStore);
        const _site = getSite();
        const base = getUnstableBase();
        return {
            dashboardLink: getSettings().__experimentalDashboardLink ||
                'index.php',
            homeUrl: base?.home,
            siteTitle: !_site?.title && !!_site?.url
                ? filterURLForDisplay(_site?.url)
                : _site?.title,
        };
    }, []);
    return (createElement("div", { className: "edit-site-site-hub" },
        createElement(HStack, { justify: "flex-start", spacing: "0" },
            createElement("div", { className: clsx('edit-site-site-hub__view-mode-toggle-container', {
                    'has-transparent-background': isTransparent,
                }) },
                createElement(Button, { ref: ref, href: dashboardLink, label: __('Go to the Dashboard', 'fincommerce'), className: "edit-site-layout__view-mode-toggle", style: {
                        transform: 'scale(0.5)',
                        borderRadius: 4,
                    } },
                    createElement(SiteIcon, { className: "edit-site-layout__view-mode-toggle-icon" }))),
            createElement(HStack, null,
                createElement("div", { className: "edit-site-site-hub__title" },
                    createElement(Button, { variant: "link", href: homeUrl, target: "_blank" },
                        siteTitle && decodeEntities(siteTitle),
                        createElement(VisuallyHidden, { as: "span" }, 
                        /* translators: accessibility text */
                        __('(opens in a new tab)', 'fincommerce'))))))));
}));
export default SiteHub;
