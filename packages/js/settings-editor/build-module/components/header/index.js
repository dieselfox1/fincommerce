/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import clsx from 'clsx';
import { __experimentalHeading as Heading, __experimentalHStack as HStack, __experimentalVStack as VStack, } from '@wordpress/components';
export const Header = ({ pageTitle = '', hasTabs = false, }) => {
    return (createElement(VStack, { className: clsx('fincommerce-settings-header fincommerce-site-page-header', {
            'fincommerce-settings-header--has-tabs': hasTabs,
        }), as: "header", spacing: 0 },
        createElement(HStack, { className: "fincommerce-site-page-header__page-title" },
            createElement(Heading, { as: "h2", level: 3, weight: 500, className: "fincommerce-site-page-header__title", truncate: true }, pageTitle))));
};
