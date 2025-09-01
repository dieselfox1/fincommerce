/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { OPERATOR_IS } from '../constants';
const STATUSES = [
    { value: 'draft', label: __('Draft', 'fincommerce') },
    { value: 'future', label: __('Scheduled', 'fincommerce') },
    { value: 'private', label: __('Private', 'fincommerce') },
    { value: 'publish', label: __('Published', 'fincommerce') },
    { value: 'trash', label: __('Trash', 'fincommerce') },
];
/**
 * TODO: auto convert some of the product editor blocks ( from the blocks directory ) to this format.
 * The edit function should work relatively well with the edit from the blocks, the only difference is that the blocks rely on getEntityProp to get the value
 */
export const productFields = [
    {
        id: 'name',
        label: __('Name', 'fincommerce'),
        enableHiding: false,
        type: 'text',
        render: function nameRender({ item }) {
            return createElement(Fragment, null, item.name);
        },
    },
    {
        id: 'sku',
        label: __('SKU', 'fincommerce'),
        enableHiding: false,
        enableSorting: false,
        render: ({ item }) => {
            return createElement(Fragment, null, item.sku);
        },
    },
    {
        id: 'date',
        label: __('Date', 'fincommerce'),
        render: ({ item }) => {
            return createElement("time", null, item.date_created);
        },
    },
    {
        label: __('Status', 'fincommerce'),
        id: 'status',
        getValue: ({ item }) => STATUSES.find(({ value }) => value === item.status)?.label ??
            item.status,
        elements: STATUSES,
        filterBy: {
            operators: [OPERATOR_IS],
        },
        enableSorting: false,
    },
];
