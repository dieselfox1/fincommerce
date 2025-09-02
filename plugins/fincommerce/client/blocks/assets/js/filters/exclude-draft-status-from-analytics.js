/**
 * External dependencies
 */
import { addFilter } from '@finpress/hooks';

addFilter(
	'fincommerce_admin_analytics_settings',
	'fincommerce-blocks/exclude-draft-status-from-analytics',
	( settings ) => {
		const removeCheckoutDraft = ( optionsGroup ) => {
			if ( optionsGroup.key === 'customStatuses' ) {
				return {
					...optionsGroup,
					options: optionsGroup.options.filter(
						( option ) => option.value !== 'checkout-draft'
					),
				};
			}
			return optionsGroup;
		};

		const actionableStatusesOptions =
			settings.fincommerce_actionable_order_statuses.options.map(
				removeCheckoutDraft
			);
		const excludedStatusesOptions =
			settings.fincommerce_excluded_report_order_statuses.options.map(
				removeCheckoutDraft
			);

		return {
			...settings,
			fincommerce_actionable_order_statuses: {
				...settings.fincommerce_actionable_order_statuses,
				options: actionableStatusesOptions,
			},
			fincommerce_excluded_report_order_statuses: {
				...settings.fincommerce_excluded_report_order_statuses,
				options: excludedStatusesOptions,
			},
		};
	}
);
