/**
 * External dependencies
 */
import { FieldLocaleOverrides, FormFields } from '@fincommerce/settings';

export type CountryData = {
	allowBilling: boolean;
	allowShipping: boolean;
	states: Record< string, string >;
	locale: Record< keyof FormFields, FieldLocaleOverrides >;
	format?: string;
};
