/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

export const attributeOptionsPreview = [
	{
		label: __( 'Blue', 'fincommerce' ),
		value: 'blue',
		rawData: {
			id: 23,
			name: __( 'Blue', 'fincommerce' ),
			slug: 'blue',
			attr_slug: 'blue',
			description: '',
			parent: 0,
			count: 4,
		},
	},
	{
		label: __( 'Gray', 'fincommerce' ),
		value: 'gray',
		selected: true,
		rawData: {
			id: 29,
			name: __( 'Gray', 'fincommerce' ),
			slug: 'gray',
			attr_slug: 'gray',
			description: '',
			parent: 0,
			count: 3,
		},
	},
	{
		label: __( 'Green', 'fincommerce' ),
		value: 'green',
		rawData: {
			id: 24,
			name: __( 'Green', 'fincommerce' ),
			slug: 'green',
			attr_slug: 'green',
			description: '',
			parent: 0,
			count: 3,
		},
	},
	{
		label: __( 'Red', 'fincommerce' ),
		value: 'red',
		selected: true,
		rawData: {
			id: 25,
			name: __( 'Red', 'fincommerce' ),
			slug: 'red',
			attr_slug: 'red',
			description: '',
			parent: 0,
			count: 4,
		},
	},
	{
		label: __( 'Yellow', 'fincommerce' ),
		value: 'yellow',
		rawData: {
			id: 30,
			name: __( 'Yellow', 'fincommerce' ),
			slug: 'yellow',
			attr_slug: 'yellow',
			description: '',
			parent: 0,
			count: 1,
		},
	},
];

export const sortOrders = {
	'name-asc': __( 'Name, A to Z', 'fincommerce' ),
	'name-desc': __( 'Name, Z to A', 'fincommerce' ),
	'count-desc': __( 'Most results first', 'fincommerce' ),
	'count-asc': __( 'Least results first', 'fincommerce' ),
};

export const sortOrderOptions = Object.entries( sortOrders ).map(
	( [ value, label ] ) => ( {
		label,
		value,
	} )
);
