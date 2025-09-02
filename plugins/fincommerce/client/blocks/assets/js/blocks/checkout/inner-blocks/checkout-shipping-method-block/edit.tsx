/* eslint-disable @finpress/no-unsafe-wp-apis */
/**
 * External dependencies
 */
import clsx from 'clsx';
import { __ } from '@finpress/i18n';
import { PanelBody, ToggleControl } from '@finpress/components';
import { Icon, store, shipping } from '@finpress/icons';
import { ADMIN_URL, getSetting } from '@fincommerce/settings';
import { LOCAL_PICKUP_ENABLED } from '@fincommerce/block-settings';
import {
	InspectorControls,
	useBlockProps,
	RichText,
} from '@finpress/block-editor';
import { Button } from '@ariakit/react';
import { useShippingData } from '@fincommerce/base-context/hooks';
import { innerBlockAreas } from '@fincommerce/blocks-checkout';
import { useDispatch, useSelect } from '@finpress/data';
import { checkoutStore as checkoutStoreDescriptor } from '@fincommerce/block-data';
import ExternalLinkCard from '@fincommerce/editor-components/external-link-card';
import { useEffect } from '@finpress/element';

/**
 * Internal dependencies
 */
import {
	FormStepBlock,
	AdditionalFields,
	AdditionalFieldsContent,
} from '@fincommerce/block-library/assets/js/blocks/checkout/form-step';
import { RatePrice, getLocalPickupPrices, getShippingPrices } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-method-block/shared';
import type { minMaxPrices } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-method-block/shared';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-method-block/style.scss';
import { defaultShippingText, defaultLocalPickupText } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-method-block/constants';

const LocalPickupSelector = ( {
	checked,
	rate,
	showPrice,
	showIcon,
	toggleText,
	setAttributes,
	onClick,
}: {
	checked: string;
	rate: minMaxPrices;
	showPrice: boolean;
	showIcon: boolean;
	toggleText: string;
	onClick: () => void;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ) => {
	return (
		<Button
			render={ <div /> }
			className={ clsx( 'wc-block-checkout__shipping-method-option', {
				'wc-block-checkout__shipping-method-option--selected':
					checked === 'pickup',
			} ) }
			onClick={ onClick }
		>
			{ showIcon === true && (
				<Icon
					icon={ store }
					size={ 28 }
					className="wc-block-checkout__shipping-method-option-icon"
				/>
			) }
			<RichText
				value={ toggleText }
				placeholder={ defaultLocalPickupText }
				tagName="span"
				className="wc-block-checkout__shipping-method-option-title"
				onChange={ ( value ) =>
					setAttributes( { localPickupText: value } )
				}
				__unstableDisableFormats
				preserveWhiteSpace
			/>
			{ showPrice === true && (
				<RatePrice minRate={ rate.min } maxRate={ rate.max } />
			) }
		</Button>
	);
};

const ShippingSelector = ( {
	checked,
	rate,
	showPrice,
	showIcon,
	toggleText,
	setAttributes,
	onClick,
}: {
	checked: string;
	rate: minMaxPrices;
	showPrice: boolean;
	showIcon: boolean;
	toggleText: string;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
	onClick: () => void;
} ) => {
	const Price =
		rate.min === undefined ? (
			<span className="wc-block-checkout__shipping-method-option-price">
				{ __( 'calculated with an address', 'fincommerce' ) }
			</span>
		) : (
			<RatePrice minRate={ rate.min } maxRate={ rate.max } />
		);

	return (
		<Button
			render={ <div /> }
			className={ clsx( 'wc-block-checkout__shipping-method-option', {
				'wc-block-checkout__shipping-method-option--selected':
					checked === 'shipping',
			} ) }
			onClick={ onClick }
		>
			{ showIcon === true && (
				<Icon
					icon={ shipping }
					size={ 28 }
					className="wc-block-checkout__shipping-method-option-icon"
				/>
			) }
			<RichText
				value={ toggleText }
				placeholder={ defaultShippingText }
				tagName="span"
				className="wc-block-checkout__shipping-method-option-title"
				onChange={ ( value ) =>
					setAttributes( { shippingText: value } )
				}
				__unstableDisableFormats
				preserveWhiteSpace
			/>
			{ showPrice === true && Price }
		</Button>
	);
};

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		title: string;
		description: string;
		showStepNumber: boolean;
		allowCreateAccount: boolean;
		localPickupText: string;
		shippingText: string;
		showPrice: boolean;
		showIcon: boolean;
		className: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element | null => {
	useEffect( () => {
		const localPickupTitle = getSetting< string >(
			'localPickupText',
			attributes.localPickupText
		);
		setAttributes( { localPickupText: localPickupTitle } );
		// Disable the exhaustive deps rule because we only want to run this on first mount to set the attribute, not
		// each time the attribute changes.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ setAttributes ] );
	const { setPrefersCollection } = useDispatch( checkoutStoreDescriptor );
	const { prefersCollection } = useSelect( ( select ) => {
		const checkoutStore = select( checkoutStoreDescriptor );
		return {
			prefersCollection: checkoutStore.prefersCollection(),
		};
	} );
	const { showPrice, showIcon, className, localPickupText, shippingText } =
		attributes;
	const {
		shippingRates,
		needsShipping,
		hasCalculatedShipping,
		isCollectable,
	} = useShippingData();

	if (
		! needsShipping ||
		! hasCalculatedShipping ||
		! shippingRates ||
		! isCollectable ||
		! LOCAL_PICKUP_ENABLED
	) {
		return null;
	}

	const changeView = ( method: string ) => {
		if ( method === 'pickup' ) {
			setPrefersCollection( true );
		} else {
			setPrefersCollection( false );
		}
	};

	return (
		<FormStepBlock
			attributes={ attributes }
			setAttributes={ setAttributes }
			className={ clsx(
				'wc-block-checkout__shipping-method',
				className
			) }
		>
			<InspectorControls>
				<PanelBody title={ __( 'Appearance', 'fincommerce' ) }>
					<p className="wc-block-checkout__controls-text">
						{ __(
							'Choose how this block is displayed to your customers.',
							'fincommerce'
						) }
					</p>
					<ToggleControl
						label={ __( 'Show icon', 'fincommerce' ) }
						checked={ showIcon }
						onChange={ () =>
							setAttributes( {
								showIcon: ! showIcon,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Show costs', 'fincommerce' ) }
						checked={ showPrice }
						onChange={ () =>
							setAttributes( {
								showPrice: ! showPrice,
							} )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Shipping Methods', 'fincommerce' ) }>
					<p className="wc-block-checkout__controls-text">
						{ __(
							'Methods can be made managed in your store settings.',
							'fincommerce'
						) }
					</p>
					<ExternalLinkCard
						key={ 'shipping_methods' }
						href={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=shipping` }
						title={ __( 'Shipping', 'fincommerce' ) }
						description={ __(
							'Manage your shipping zones, methods, and rates.',
							'fincommerce'
						) }
					/>
					<ExternalLinkCard
						key={ 'pickup_location' }
						href={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=shipping&section=pickup_location` }
						title={ __( 'Pickup', 'fincommerce' ) }
						description={ __(
							'Allow customers to choose a local pickup location during checkout.',
							'fincommerce'
						) }
					/>
				</PanelBody>
			</InspectorControls>
			<div
				id="shipping-method"
				className="wc-block-checkout__shipping-method-container"
				role="radiogroup"
			>
				<ShippingSelector
					checked={ prefersCollection ? 'pickup' : 'shipping' }
					rate={ getShippingPrices(
						shippingRates[ 0 ]?.shipping_rates
					) }
					onClick={ () => {
						changeView( 'shipping' );
					} }
					showPrice={ showPrice }
					showIcon={ showIcon }
					setAttributes={ setAttributes }
					toggleText={ shippingText }
				/>
				<LocalPickupSelector
					checked={ prefersCollection ? 'pickup' : 'shipping' }
					rate={ getLocalPickupPrices(
						shippingRates[ 0 ]?.shipping_rates
					) }
					showPrice={ showPrice }
					onClick={ () => {
						changeView( 'pickup' );
					} }
					showIcon={ showIcon }
					setAttributes={ setAttributes }
					toggleText={ localPickupText }
				/>
			</div>
			<AdditionalFields block={ innerBlockAreas.SHIPPING_METHOD } />
		</FormStepBlock>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<AdditionalFieldsContent />
		</div>
	);
};
