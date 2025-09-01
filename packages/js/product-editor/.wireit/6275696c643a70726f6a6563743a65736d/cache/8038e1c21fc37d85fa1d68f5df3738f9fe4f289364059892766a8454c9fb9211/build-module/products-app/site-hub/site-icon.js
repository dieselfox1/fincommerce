/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { wordpress } from '@wordpress/icons';
import { store as coreDataStore } from '@wordpress/core-data';
import clsx from 'clsx';
function SiteIcon({ className }) {
    const { isRequestingSite, siteIconUrl } = useSelect((select) => {
        const { getEntityRecord } = select(coreDataStore);
        // @ts-expect-error Selector is not right typed with '__unstableBase'
        const siteData = getEntityRecord('root', '__unstableBase');
        return {
            isRequestingSite: !siteData,
            siteIconUrl: siteData?.site_icon_url,
        };
    }, []);
    if (isRequestingSite && !siteIconUrl) {
        return createElement("div", { className: "edit-site-site-icon__image" });
    }
    const icon = siteIconUrl ? (createElement("img", { className: "edit-site-site-icon__image", alt: __('Site Icon', 'fincommerce'), src: siteIconUrl })) : (createElement(Icon, { className: "edit-site-site-icon__icon", icon: wordpress, size: 48 }));
    return (createElement("div", { className: clsx(className, 'edit-site-site-icon') }, icon));
}
export default SiteIcon;
