/**
 * External dependencies
 */
import { withFilteredAttributes } from '@fincommerce/shared-hocs';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-taxes/block';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-taxes/attributes';

export default withFilteredAttributes( attributes )( Block );
