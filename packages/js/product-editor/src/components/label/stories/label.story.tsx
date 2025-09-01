/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createElement } from 'react';

/**
 * Internal dependencies
 */
import { Label, LabelProps } from '../label';

export default {
	title: 'Product Editor/components/Label',
	component: Label,
	args: {
		label: 'sku',
		required: true,
		note: __( '(stock keeping unit)', 'fincommerce' ),
		tooltip: __( 'Visit woo.com', 'fincommerce' ),
	},
};

export const Default = ( args: LabelProps ) => <Label { ...args } />;
