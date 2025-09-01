/**
 * External dependencies
 */
import { isString } from '@fincommerce/types';
import { getUrlParameter } from '@fincommerce/utils';

export const getActiveFilters = ( queryParamKey = 'filter_rating' ) => {
	const params = getUrlParameter( queryParamKey );

	if ( ! params ) {
		return [];
	}

	const parsedParams = isString( params )
		? params.split( ',' )
		: ( params as string[] );

	return parsedParams;
};
