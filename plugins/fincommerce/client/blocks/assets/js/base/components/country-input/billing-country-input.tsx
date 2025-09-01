/**
 * External dependencies
 */
import { COUNTRIES } from '@fincommerce/block-settings';

/**
 * Internal dependencies
 */
import CountryInput from '@fincommerce/block-library/assets/js/base/components/country-input/country-input';
import type { CountryInputProps } from '@fincommerce/block-library/assets/js/base/components/country-input/CountryInputProps';

const BillingCountryInput = ( props: CountryInputProps ): JSX.Element => {
	const { ...restOfProps } = props;

	return <CountryInput countries={ COUNTRIES } { ...restOfProps } />;
};

export default BillingCountryInput;
