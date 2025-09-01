/**
 * External dependencies
 */
import { STATES } from '@fincommerce/block-settings';

/**
 * Internal dependencies
 */
import StateInput from '@fincommerce/block-library/assets/js/base/components/state-input/state-input';
import type { StateInputProps } from '@fincommerce/block-library/assets/js/base/components/state-input/StateInputProps';

const BillingStateInput = ( props: StateInputProps ): JSX.Element => {
	const { ...restOfProps } = props;

	return <StateInput states={ STATES } { ...restOfProps } />;
};

export default BillingStateInput;
