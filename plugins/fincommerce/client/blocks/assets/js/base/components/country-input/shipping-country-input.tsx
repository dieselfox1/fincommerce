/**
 * External dependencies
 */
import { COUNTRIES } from '@fincommerce/block-settings';

/**
 * Internal dependencies
 */
import CountryInput from '@fincommerce/block-library/assets/js/base/components/country-input/country-input';
import { CountryInputProps } from '@fincommerce/block-library/assets/js/base/components/country-input/CountryInputProps';

const ShippingCountryInput = ( props: CountryInputProps ): JSX.Element => {
	return <CountryInput countries={ COUNTRIES } { ...props } />;
};

export default ShippingCountryInput;
