/**
 * External dependencies
 */
import { withFilteredAttributes } from '@fincommerce/shared-hocs';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/title/block';
import { attributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/title/block.json';

export default withFilteredAttributes( attributes )( Block );
