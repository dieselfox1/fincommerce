/**
 * External dependencies
 */
import { Children, cloneElement, isValidElement } from '@wordpress/element';
import { getValidBlockAttributes } from '@fincommerce/base-utils';
import { useStoreCart } from '@fincommerce/base-context';
import {
	useCheckoutExtensionData,
	useValidation,
} from '@fincommerce/base-context/hooks';
import { getRegisteredBlockComponents } from '@fincommerce/blocks-registry';
import { renderParentBlock } from '@fincommerce/atomic-utils';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/register-components';
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/block';
import { blockName, blockAttributes } from '@fincommerce/block-library/assets/js/blocks/checkout/attributes';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/block.json';

const getProps = ( el: Element ) => {
	return {
		attributes: getValidBlockAttributes(
			{ ...metadata.attributes, ...blockAttributes },
			/* eslint-disable @typescript-eslint/no-explicit-any */
			( el instanceof HTMLElement ? el.dataset : {} ) as any
		),
	};
};

const Wrapper = ( {
	children,
}: {
	children: React.ReactChildren;
} ): React.ReactNode => {
	// we need to pluck out receiveCart.
	// eslint-disable-next-line no-unused-vars
	const { extensions, receiveCart, ...cart } = useStoreCart();
	const checkoutExtensionData = useCheckoutExtensionData();
	const validation = useValidation();
	return Children.map( children, ( child ) => {
		if ( isValidElement( child ) ) {
			const componentProps = {
				extensions,
				cart,
				checkoutExtensionData,
				validation,
			};
			return cloneElement( child, componentProps );
		}
		return child;
	} );
};

renderParentBlock( {
	Block,
	blockName,
	selector:
		'.wp-block-fincommerce-checkout[data-block-name="fincommerce/checkout"]',
	getProps,
	blockMap: getRegisteredBlockComponents( blockName ),
	blockWrapper: Wrapper,
	options: {
		multiple: metadata.supports.multiple,
	},
} );
