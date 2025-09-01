/**
 * External dependencies
 */
import { renderFrontend } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/products/all-products/block';

/**
 * Wrapper component to supply the notice provider.
 *
 * @param {*} props
 */
const AllProductsFrontend = ( props ) => {
	return <Block { ...props } />;
};

const getProps = ( el ) => ( {
	attributes: JSON.parse( el.dataset.attributes ),
} );

renderFrontend( {
	selector: '.wp-block-fincommerce-all-products',
	Block: AllProductsFrontend,
	getProps,
} );
