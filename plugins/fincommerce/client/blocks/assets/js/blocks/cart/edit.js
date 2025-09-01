/* tslint:disable */
/**
 * External dependencies
 */
import clsx from 'clsx';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import BlockErrorBoundary from '@fincommerce/base-components/block-error-boundary';
import { EditorProvider, CartProvider } from '@fincommerce/base-context';
import { previewCart } from '@fincommerce/resource-previews';
import { SlotFillProvider } from '@fincommerce/blocks-checkout';
import { useEffect, useRef } from '@wordpress/element';
import { getQueryArg } from '@wordpress/url';
import { dispatch, select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks';
import '@fincommerce/block-library/assets/js/blocks/cart/editor.scss';
import {
	addClassToBody,
	useBlockPropsWithLocking,
	BlockSettings,
} from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared';
import '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/sidebar-notices';
import '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/view-switcher';
import { CartBlockContext } from '@fincommerce/block-library/assets/js/blocks/cart/context';

// This is adds a class to body to signal if the selected block is locked
addClassToBody();

// Array of allowed block names.
const ALLOWED_BLOCKS = [
	'fincommerce/filled-cart-block',
	'fincommerce/empty-cart-block',
];

export const Edit = ( { clientId, className, attributes, setAttributes } ) => {
	const { hasDarkControls, currentView, isPreview = false } = attributes;
	const defaultTemplate = [
		[ 'fincommerce/filled-cart-block', {}, [] ],
		[ 'fincommerce/empty-cart-block', {}, [] ],
	];
	const blockProps = useBlockPropsWithLocking( {
		className: clsx( className, 'wp-block-fincommerce-cart', {
			'is-editor-preview': isPreview,
		} ),
	} );

	// This focuses on the block when a certain query param is found. This is used on the link from the task list.
	const focus = useRef( getQueryArg( window.location.href, 'focus' ) );

	useEffect( () => {
		if (
			focus.current === 'cart' &&
			! select( 'core/block-editor' ).hasSelectedBlock()
		) {
			dispatch( 'core/block-editor' ).selectBlock( clientId );
			dispatch( 'core/interface' ).enableComplementaryArea(
				'core/edit-site',
				'edit-site/block-inspector'
			);
		}
	}, [ clientId ] );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<BlockSettings
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>
			<BlockErrorBoundary
				header={ __( 'Cart Block Error', 'fincommerce' ) }
				text={ __(
					'There was an error whilst rendering the cart block. If this problem continues, try re-creating the block.',
					'fincommerce'
				) }
				showErrorMessage={ true }
				errorMessagePrefix={ __( 'Error message:', 'fincommerce' ) }
			>
				<EditorProvider
					previewData={ { previewCart } }
					currentView={ currentView }
					isPreview={ !! isPreview }
				>
					<CartBlockContext.Provider
						value={ {
							hasDarkControls,
						} }
					>
						<SlotFillProvider>
							<CartProvider>
								<InnerBlocks
									allowedBlocks={ ALLOWED_BLOCKS }
									template={ defaultTemplate }
									templateLock="insert"
								/>
							</CartProvider>
						</SlotFillProvider>
					</CartBlockContext.Provider>
				</EditorProvider>
			</BlockErrorBoundary>
		</div>
	);
};

export const Save = () => {
	return (
		<div
			{ ...useBlockProps.save( {
				className: 'is-loading',
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
};
