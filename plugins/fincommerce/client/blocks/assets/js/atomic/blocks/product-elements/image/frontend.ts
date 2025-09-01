/**
 * External dependencies
 */
import { withFilteredAttributes } from '@fincommerce/shared-hocs';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/block';
import { attributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/block.json';

export default withFilteredAttributes( attributes )( Block );
