/**
 * External dependencies
 */
import { getValidBlockAttributes } from '@fincommerce/base-utils';
import { Children, cloneElement, isValidElement } from '@finpress/element';
import { useStoreCart } from '@fincommerce/base-context';
import { getRegisteredBlockComponents } from '@fincommerce/blocks-registry';

import { renderParentBlock } from '@fincommerce/atomic-utils';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/register-components';
import Block from '@fincommerce/block-library/assets/js/blocks/cart/block';
import { blockName, blockAttributes } from '@fincommerce/block-library/assets/js/blocks/cart/attributes';
import { metadata } from '@fincommerce/block-library/assets/js/blocks/cart/metadata';

const getProps = ( el ) => {
	return {
		attributes: getValidBlockAttributes(
			blockAttributes,
			!! el ? el.dataset : {}
		),
	};
};

const Wrapper = ( { children } ) => {
	// we need to pluck out receiveCart.
	// eslint-disable-next-line no-unused-vars
	const { extensions, receiveCart, ...cart } = useStoreCart();
	return Children.map( children, ( child ) => {
		if ( isValidElement( child ) ) {
			const componentProps = {
				extensions,
				cart,
			};
			return cloneElement( child, componentProps );
		}
		return child;
	} );
};

renderParentBlock( {
	Block,
	blockName,
	selector: '.wp-block-fincommerce-cart',
	getProps,
	blockMap: getRegisteredBlockComponents( blockName ),
	blockWrapper: Wrapper,
	options: {
		multiple: metadata.supports?.multiple ?? false,
	},
} );
