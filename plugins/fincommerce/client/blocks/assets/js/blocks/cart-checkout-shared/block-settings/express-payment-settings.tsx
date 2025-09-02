/**
 * External dependencies
 */
import { InspectorControls, HeightControl } from '@finpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RadioControl,
	Notice,
} from '@finpress/components';
import ExternalLinkCard from '@fincommerce/editor-components/external-link-card';
import { __ } from '@finpress/i18n';
import type { BlockAttributes } from '@finpress/blocks';
import { select } from '@finpress/data';
import { paymentStore } from '@fincommerce/block-data';
import { ADMIN_URL } from '@fincommerce/settings';

const allStyleControls = [ 'height', 'borderRadius' ];

const atLeastOnePaymentMethodSupportsOneOf = ( styleControl: string[] ) => {
	const availableExpressMethods =
		select( paymentStore ).getAvailableExpressPaymentMethods();

	return Object.values( availableExpressMethods ).reduce(
		( acc, currentValue ) => {
			return (
				acc ||
				currentValue?.supportsStyle.some( ( el ) =>
					styleControl.includes( el )
				)
			);
		},
		false
	);
};

const ExpressPaymentButtonStyleControls = ( {
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: ( attrs: BlockAttributes ) => void;
} ) => {
	const { buttonHeight, buttonBorderRadius } = attributes;

	return (
		<>
			{ atLeastOnePaymentMethodSupportsOneOf( [ 'height' ] ) && (
				<RadioControl
					label={ __( 'Button height', 'fincommerce' ) }
					selected={ buttonHeight }
					options={ [
						{
							label: __( 'Small (40px)', 'fincommerce' ),
							value: '40',
						},
						{
							label: __( 'Medium (48px)', 'fincommerce' ),
							value: '48',
						},
						{
							label: __( 'Large (55px)', 'fincommerce' ),
							value: '55',
						},
					] }
					onChange={ ( newValue: string ) =>
						setAttributes( { buttonHeight: newValue } )
					}
				/>
			) }
			{ atLeastOnePaymentMethodSupportsOneOf( [ 'borderRadius' ] ) && (
				<div className="border-radius-control-container">
					<HeightControl
						label={ __( 'Button border radius', 'fincommerce' ) }
						value={ buttonBorderRadius }
						onChange={ ( newValue: string ) => {
							const valueOnly = newValue.replace( 'px', '' );
							setAttributes( {
								buttonBorderRadius: valueOnly,
							} );
						} }
					/>
				</div>
			) }
		</>
	);
};

const ExpressPaymentToggle = ( {
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: ( attrs: BlockAttributes ) => void;
} ) => {
	if ( attributes.showButtonStyles ) {
		return (
			<ExpressPaymentButtonStyleControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		);
	}
	return null;
};

const ExpressPaymentMethods = () => {
	const availableExpressMethods =
		select( paymentStore ).getAvailableExpressPaymentMethods();

	if ( Object.entries( availableExpressMethods ).length < 1 ) {
		return (
			<p className="wc-block-checkout__controls-text">
				{ __(
					'You currently have no express payment integrations active.',
					'fincommerce'
				) }
			</p>
		);
	}

	return (
		<>
			<p className="wc-block-checkout__controls-text">
				{ __(
					'You currently have the following express payment integrations active.',
					'fincommerce'
				) }
			</p>
			{ Object.values( availableExpressMethods ).map( ( values ) => {
				return (
					<ExternalLinkCard
						key={ values.name }
						href={ `${ ADMIN_URL }admin.php?page=wc-settings&tab=checkout&section=${ encodeURIComponent(
							values.gatewayId
						) }` }
						title={ values.title }
						description={ values.description }
					/>
				);
			} ) }
		</>
	);
};

const toggleLabel = (
	<>
		{ __( 'Apply uniform styles', 'fincommerce' ) }{ ' ' }
		<span className="express-payment-styles-beta-badge">Beta</span>
	</>
);

export const ExpressPaymentControls = ( {
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: ( attrs: BlockAttributes ) => void;
} ) => {
	return (
		<InspectorControls>
			{ atLeastOnePaymentMethodSupportsOneOf( allStyleControls ) && (
				<PanelBody
					title={ __( 'Button Settings', 'fincommerce' ) }
					className="express-payment-button-settings"
				>
					<ToggleControl
						label={ toggleLabel }
						checked={ attributes.showButtonStyles }
						onChange={ () =>
							setAttributes( {
								showButtonStyles: ! attributes.showButtonStyles,
							} )
						}
						help={ __(
							'Sets a consistent style for express payment buttons.',
							'fincommerce'
						) }
					/>
					<Notice
						status="warning"
						isDismissible={ false }
						className="wc-block-checkout__notice express-payment-styles-notice"
					>
						<strong>{ __( 'Note', 'fincommerce' ) }:</strong>{ ' ' }
						{ __(
							'Some payment methods might not yet support all style controls',
							'fincommerce'
						) }
					</Notice>
					<ExpressPaymentToggle
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</PanelBody>
			) }
			<PanelBody title={ __( 'Express Payment Methods', 'fincommerce' ) }>
				<ExpressPaymentMethods />
			</PanelBody>
		</InspectorControls>
	);
};
