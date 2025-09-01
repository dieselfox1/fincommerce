/**
 * Internal dependencies
 */
import { isObject, objectHasProp } from '@fincommerce/block-library/assets/js/types/type-guards/object';
import type { ApiErrorResponse } from '@fincommerce/block-library/assets/js/types/type-defs';

// Type guard for ApiErrorResponse.
export const isApiErrorResponse = (
	response: unknown
): response is ApiErrorResponse => {
	return (
		isObject( response ) &&
		objectHasProp( response, 'code' ) &&
		objectHasProp( response, 'message' )
	);
};
