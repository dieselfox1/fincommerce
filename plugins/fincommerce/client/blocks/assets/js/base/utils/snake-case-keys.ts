/**
 * External dependencies
 */
import { snakeCase } from 'change-case';

/**
 * Internal dependencies
 */
import { mapKeys } from '@fincommerce/block-library/assets/js/base/utils/map-keys';

export const snakeCaseKeys = ( obj: object ) =>
	mapKeys( obj, ( _, key ) => snakeCase( key ) );
