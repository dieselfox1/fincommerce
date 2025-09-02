/**
 * External dependencies
 */
import { optionsStore } from '@fincommerce/data';
import { resolveSelect } from '@finpress/data';

export const fetchSurveyCompletedOption = async () =>
	resolveSelect( optionsStore ).getOption(
		'fincommerce_admin_customize_store_survey_completed'
	);
