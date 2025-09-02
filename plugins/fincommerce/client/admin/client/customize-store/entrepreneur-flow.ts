/**
 * External dependencies
 */
import { addFilter } from '@finpress/hooks';

export const ENTREPRENEUR_FLOW_QUERY_PARAM_VALUE = 'entrepreneur-signup';
export const ENTREPRENEUR_FLOW_QUERY_PARAM_KEY = 'ref';

addFilter(
	'fincommerce_admin_persisted_queries',
	'fincommerce_admin_customize_your_store',
	( params ) => {
		params.push( ENTREPRENEUR_FLOW_QUERY_PARAM_KEY );
		return params;
	}
);

export const isEntrepreneurFlow = () => {
	const urlParams = new URLSearchParams( window.location.search );
	const param = urlParams.get( ENTREPRENEUR_FLOW_QUERY_PARAM_KEY );
	return param === ENTREPRENEUR_FLOW_QUERY_PARAM_VALUE;
};
