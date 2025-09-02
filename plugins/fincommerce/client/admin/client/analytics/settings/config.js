/**
 * External dependencies
 */
import { __, sprintf } from '@finpress/i18n';
import { applyFilters } from '@finpress/hooks';
import interpolateComponents from '@automattic/interpolate-components';

/**
 * Internal dependencies
 */
import DefaultDate from './default-date';
import { getAdminSetting, ORDER_STATUSES } from '~/utils/admin-settings';

const SETTINGS_FILTER = 'fincommerce_admin_analytics_settings';
export const DEFAULT_ACTIONABLE_STATUSES = [ 'processing', 'on-hold' ];
export const DEFAULT_ORDER_STATUSES = [
	'completed',
	'processing',
	'refunded',
	'cancelled',
	'failed',
	'pending',
	'on-hold',
];
export const DEFAULT_DATE_RANGE = 'period=month&compare=previous_year';

const filteredOrderStatuses = Object.keys( ORDER_STATUSES )
	.filter( ( status ) => status !== 'refunded' )
	.map( ( key ) => {
		return {
			value: key,
			label: ORDER_STATUSES[ key ],
			description: sprintf(
				/* translators: %s: non-refunded order statuses to exclude */
				__( 'Exclude the %s status from reports', 'fincommerce' ),
				ORDER_STATUSES[ key ]
			),
		};
	} );

const unregisteredOrderStatuses = getAdminSetting(
	'unregisteredOrderStatuses',
	{}
);

const orderStatusOptions = [
	{
		key: 'defaultStatuses',
		options: filteredOrderStatuses.filter( ( status ) =>
			DEFAULT_ORDER_STATUSES.includes( status.value )
		),
	},
	{
		key: 'customStatuses',
		label: __( 'Custom Statuses', 'fincommerce' ),
		options: filteredOrderStatuses.filter(
			( status ) => ! DEFAULT_ORDER_STATUSES.includes( status.value )
		),
	},
	{
		key: 'unregisteredStatuses',
		label: __( 'Unregistered Statuses', 'fincommerce' ),
		options: Object.keys( unregisteredOrderStatuses ).map( ( key ) => {
			return {
				value: key,
				label: key,
				description: sprintf(
					/* translators: %s: unregistered order statuses to exclude */
					__( 'Exclude the %s status from reports', 'fincommerce' ),
					key
				),
			};
		} ),
	},
];

/**
 * Filter Analytics Report settings. Add a UI element to the Analytics Settings page.
 *
 * @filter fincommerce_admin_analytics_settings
 * @param {Object} reportSettings Report settings.
 */
export const config = applyFilters( SETTINGS_FILTER, {
	fincommerce_excluded_report_order_statuses: {
		label: __( 'Excluded statuses:', 'fincommerce' ),
		inputType: 'checkboxGroup',
		options: orderStatusOptions,
		helpText: interpolateComponents( {
			mixedString: __(
				'Orders with these statuses are excluded from the totals in your reports. ' +
					'The {{strong}}Refunded{{/strong}} status can not be excluded.',
				'fincommerce'
			),
			components: {
				strong: <strong />,
			},
		} ),
		defaultValue: [ 'pending', 'cancelled', 'failed' ],
	},
	fincommerce_actionable_order_statuses: {
		label: __( 'Actionable statuses:', 'fincommerce' ),
		inputType: 'checkboxGroup',
		options: orderStatusOptions,
		helpText: __(
			'Orders with these statuses require action on behalf of the store admin. ' +
				'These orders will show up in the Home Screen - Orders task.',
			'fincommerce'
		),
		defaultValue: DEFAULT_ACTIONABLE_STATUSES,
	},
	fincommerce_default_date_range: {
		name: 'fincommerce_default_date_range',
		label: __( 'Default date range:', 'fincommerce' ),
		inputType: 'component',
		component: DefaultDate,
		helpText: __(
			'Select a default date range. When no range is selected, reports will be viewed by ' +
				'the default date range.',
			'fincommerce'
		),
		defaultValue: DEFAULT_DATE_RANGE,
	},
	fincommerce_date_type: {
		name: 'fincommerce_date_type',
		label: __( 'Date type:', 'fincommerce' ),
		inputType: 'select',
		options: [
			{
				label: __( 'Select a date type', 'fincommerce' ),
				value: '',
				disabled: true,
			},
			{
				label: __( 'Date created', 'fincommerce' ),
				value: 'date_created',
				key: 'date_created',
			},
			{
				label: __( 'Date paid', 'fincommerce' ),
				value: 'date_paid',
				key: 'date_paid',
			},
			{
				label: __( 'Date completed', 'fincommerce' ),
				value: 'date_completed',
				key: 'date_completed',
			},
		],
		helpText: __(
			'Database date field considered for Revenue and Orders reports',
			'fincommerce'
		),
	},
} );
