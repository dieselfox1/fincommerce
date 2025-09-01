/**
 * External dependencies
 */
import { withFilteredAttributes } from '@fincommerce/shared-hocs';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/proceed-to-checkout-block/block';
import attributes from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/proceed-to-checkout-block/attributes';

export default withFilteredAttributes( attributes )( Block );
