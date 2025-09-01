/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { alignCenter, alignJustify, alignLeft, alignRight, } from '@wordpress/icons';
export const ALIGNMENT_CONTROLS = [
    {
        icon: alignLeft,
        title: __('Align text left', 'fincommerce'),
        align: 'left',
    },
    {
        icon: alignCenter,
        title: __('Align text center', 'fincommerce'),
        align: 'center',
    },
    {
        icon: alignRight,
        title: __('Align text right', 'fincommerce'),
        align: 'right',
    },
    {
        icon: alignJustify,
        title: __('Align text justify', 'fincommerce'),
        align: 'justify',
    },
];
