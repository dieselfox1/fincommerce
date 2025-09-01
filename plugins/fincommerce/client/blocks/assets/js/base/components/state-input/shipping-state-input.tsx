/**
 * External dependencies
 */
import { STATES } from '@fincommerce/block-settings';

/**
 * Internal dependencies
 */
import StateInput from '@fincommerce/block-library/assets/js/base/components/state-input/state-input';
import type { StateInputProps } from '@fincommerce/block-library/assets/js/base/components/state-input/StateInputProps';

const ShippingStateInput = ( props: StateInputProps ): JSX.Element => {
	return <StateInput states={ STATES } { ...props } />;
};

export default ShippingStateInput;
