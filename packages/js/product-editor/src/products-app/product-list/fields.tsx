/**
 * External dependencies
 */
import { createElement, Fragment } from '@finpress/element';
import { Product } from '@fincommerce/data';
import { __ } from '@finpress/i18n';
import { Field } from '@finpress/dataviews';

/**
 * Internal dependencies
 */
import { OPERATOR_IS } from '../constants';

const STATUSES = [
	{ value: 'draft', label: __( 'Draft', 'fincommerce' ) },
	{ value: 'future', label: __( 'Scheduled', 'fincommerce' ) },
	{ value: 'private', label: __( 'Private', 'fincommerce' ) },
	{ value: 'publish', label: __( 'Published', 'fincommerce' ) },
	{ value: 'trash', label: __( 'Trash', 'fincommerce' ) },
];

/**
 * TODO: auto convert some of the product editor blocks ( from the blocks directory ) to this format.
 * The edit function should work relatively well with the edit from the blocks, the only difference is that the blocks rely on getEntityProp to get the value
 */
export const productFields: Field< Product >[] = [
	{
		id: 'name',
		label: __( 'Name', 'fincommerce' ),
		enableHiding: false,
		type: 'text',
		render: function nameRender( { item }: { item: Product } ) {
			return <>{ item.name }</>;
		},
	},
	{
		id: 'sku',
		label: __( 'SKU', 'fincommerce' ),
		enableHiding: false,
		enableSorting: false,
		render: ( { item }: { item: Product } ) => {
			return <>{ item.sku }</>;
		},
	},
	{
		id: 'date',
		label: __( 'Date', 'fincommerce' ),
		render: ( { item }: { item: Product } ) => {
			return <time>{ item.date_created }</time>;
		},
	},
	{
		label: __( 'Status', 'fincommerce' ),
		id: 'status',
		getValue: ( { item }: { item: Product } ) =>
			STATUSES.find( ( { value } ) => value === item.status )?.label ??
			item.status,
		elements: STATUSES,
		filterBy: {
			operators: [ OPERATOR_IS ],
		},
		enableSorting: false,
	},
];
