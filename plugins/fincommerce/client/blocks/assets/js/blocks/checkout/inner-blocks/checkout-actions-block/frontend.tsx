/**
 * External dependencies
 */
import { withFilteredAttributes } from '@fincommerce/shared-hocs';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/block';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/attributes';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/block.json';

export default withFilteredAttributes( {
	...attributes,
	...metadata.attributes,
} )( Block );
