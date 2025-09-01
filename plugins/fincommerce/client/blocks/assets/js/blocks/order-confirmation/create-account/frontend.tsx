/**
 * External dependencies
 */
import { renderFrontend } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/order-confirmation/create-account/form';
import { parseAttributes } from '@fincommerce/block-library/assets/js/blocks/order-confirmation/create-account/utils';

const getProps = ( el: HTMLElement ) => {
	return {
		attributes: parseAttributes( el.dataset ),
		isEditor: false,
	};
};

// This does not replace the entire block markup, just the form part.
renderFrontend( {
	selector: '.wc-block-order-confirmation-create-account-form',
	Block,
	getProps,
} );
