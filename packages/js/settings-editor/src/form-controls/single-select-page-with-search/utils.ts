/**
 * External dependencies
 */
import { Page } from '@finpress/core-data';
import { __, sprintf } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { PageItem } from './types';

/**
 * The formatPageToItem function is used to format a page to an item.
 *
 * @param page - The page to format.
 * @return The formatted item.
 */
export const formatPageToItem = ( page: Page ): PageItem => ( {
	label: sprintf(
		/* translators: 1: page name 2: page ID */
		__( '%1$s (ID: %2$s)', 'fincommerce' ),
		page.title.rendered,
		page.id
	),
	value: page.id.toString(),
} );
