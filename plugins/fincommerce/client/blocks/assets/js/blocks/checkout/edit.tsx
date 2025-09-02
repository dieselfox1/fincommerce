/**
 * External dependencies
 */
import clsx from 'clsx';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@finpress/block-editor';
import { SidebarLayout } from '@fincommerce/base-components/sidebar-layout';
import { CheckoutProvider, EditorProvider } from '@fincommerce/base-context';
import {
	previewCart,
	previewSavedPaymentMethods,
} from '@fincommerce/resource-previews';
import { SlotFillProvider } from '@fincommerce/blocks-checkout';
import type { TemplateArray } from '@finpress/blocks';
import { useEffect, useRef } from '@finpress/element';
import { getQueryArg } from '@finpress/url';
import { dispatch, select as selectData, useSelect } from '@finpress/data';
import { store as coreStore } from '@finpress/core-data';
import { defaultFields as defaultFieldsSetting } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks';
import '@fincommerce/block-library/assets/js/blocks/checkout/styles/editor.scss';
import {
	addClassToBody,
	BlockSettings,
	useBlockPropsWithLocking,
} from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared';
import '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/sidebar-notices';
import { CheckoutBlockContext } from '@fincommerce/block-library/assets/js/blocks/checkout/context';
import type { Attributes } from '@fincommerce/block-library/assets/js/blocks/checkout/types';

// This is adds a class to body to signal if the selected block is locked
addClassToBody();

// Array of allowed block names.
const ALLOWED_BLOCKS: string[] = [
	'fincommerce/checkout-fields-block',
	'fincommerce/checkout-totals-block',
];

export const Edit = ( {
	clientId,
	attributes,
	setAttributes,
}: {
	clientId: string;
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => undefined;
} ): JSX.Element => {
	const {
		showOrderNotes,
		showPolicyLinks,
		showReturnToCart,
		showRateAfterTaxName,
		cartPageId,
		isPreview = false,
		showFormStepNumbers = false,
		hasDarkControls = false,
	} = attributes;

	const fieldSettings = useSelect( ( select ) => {
		return select(
			coreStore as unknown as string
			// @ts-expect-error getEditedEntityRecord is not typed in @finpress/core-data yet.
		).getEditedEntityRecord( 'root', 'site' ) as Record< string, string >;
	}, [] );

	const fieldsWithDefaults = {
		phone: 'optional',
		company: 'hidden',
		address_2: 'optional',
	} as const;

	const defaultFields = {
		...defaultFieldsSetting,
		...Object.fromEntries(
			Object.entries( fieldsWithDefaults ).map(
				( [ field, defaultValue ] ) => {
					const value =
						fieldSettings[
							`fincommerce_checkout_${ field }_field`
						] || defaultValue;
					return [
						field,
						{
							...defaultFieldsSetting[
								field as keyof typeof defaultFieldsSetting
							],
							required: value === 'required',
							hidden: value === 'hidden',
						},
					];
				}
			)
		),
	};

	// This focuses on the block when a certain query param is found. This is used on the link from the task list.
	const focus = useRef( getQueryArg( window.location.href, 'focus' ) );

	useEffect( () => {
		if (
			focus.current === 'checkout' &&
			! selectData( 'core/block-editor' ).hasSelectedBlock()
		) {
			dispatch( 'core/block-editor' ).selectBlock( clientId );
			dispatch( 'core/interface' ).enableComplementaryArea(
				'core/edit-site',
				'edit-site/block-inspector'
			);
		}
	}, [ clientId ] );

	const defaultTemplate = [
		[ 'fincommerce/checkout-totals-block', {}, [] ],
		[ 'fincommerce/checkout-fields-block', {}, [] ],
	] as TemplateArray;

	const blockProps = useBlockPropsWithLocking();
	return (
		<div { ...blockProps }>
			<InspectorControls>
				<BlockSettings
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>
			<EditorProvider
				isPreview={ !! isPreview }
				previewData={ {
					previewCart,
					previewSavedPaymentMethods,
					defaultFields,
				} }
			>
				<SlotFillProvider>
					<CheckoutProvider>
						<SidebarLayout
							className={ clsx( 'wc-block-checkout', {
								'has-dark-controls': hasDarkControls,
							} ) }
						>
							<CheckoutBlockContext.Provider
								value={ {
									showOrderNotes,
									showPolicyLinks,
									showReturnToCart,
									cartPageId,
									showRateAfterTaxName,
									showFormStepNumbers,
									defaultFields,
								} }
							>
								<InnerBlocks
									allowedBlocks={ ALLOWED_BLOCKS }
									template={ defaultTemplate }
									templateLock="insert"
								/>
							</CheckoutBlockContext.Provider>
						</SidebarLayout>
					</CheckoutProvider>
				</SlotFillProvider>
			</EditorProvider>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div
			{ ...useBlockProps.save( {
				className: 'wc-block-checkout is-loading',
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
};
