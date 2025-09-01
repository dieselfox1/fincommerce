"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productFields = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
const STATUSES = [
    { value: 'draft', label: (0, i18n_1.__)('Draft', 'fincommerce') },
    { value: 'future', label: (0, i18n_1.__)('Scheduled', 'fincommerce') },
    { value: 'private', label: (0, i18n_1.__)('Private', 'fincommerce') },
    { value: 'publish', label: (0, i18n_1.__)('Published', 'fincommerce') },
    { value: 'trash', label: (0, i18n_1.__)('Trash', 'fincommerce') },
];
/**
 * TODO: auto convert some of the product editor blocks ( from the blocks directory ) to this format.
 * The edit function should work relatively well with the edit from the blocks, the only difference is that the blocks rely on getEntityProp to get the value
 */
exports.productFields = [
    {
        id: 'name',
        label: (0, i18n_1.__)('Name', 'fincommerce'),
        enableHiding: false,
        type: 'text',
        render: function nameRender({ item }) {
            return (0, element_1.createElement)(element_1.Fragment, null, item.name);
        },
    },
    {
        id: 'sku',
        label: (0, i18n_1.__)('SKU', 'fincommerce'),
        enableHiding: false,
        enableSorting: false,
        render: ({ item }) => {
            return (0, element_1.createElement)(element_1.Fragment, null, item.sku);
        },
    },
    {
        id: 'date',
        label: (0, i18n_1.__)('Date', 'fincommerce'),
        render: ({ item }) => {
            return (0, element_1.createElement)("time", null, item.date_created);
        },
    },
    {
        label: (0, i18n_1.__)('Status', 'fincommerce'),
        id: 'status',
        getValue: ({ item }) => STATUSES.find(({ value }) => value === item.status)?.label ??
            item.status,
        elements: STATUSES,
        filterBy: {
            operators: [constants_1.OPERATOR_IS],
        },
        enableSorting: false,
    },
];
