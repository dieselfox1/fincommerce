/**
 * External dependencies
 */
import { ComboboxControl, TextControl } from '@wordpress/components';
import { ComboboxControlOption } from '@wordpress/components/build-types/combobox-control/types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useShipmentFormContext } from '../../context/shipment-form-context';
import ShipmentProviders from '../../data/shipment-providers';
import { SearchIcon } from '../../utils/icons';

const ShippingProviderListItem = ( {
	item,
}: {
	item: ComboboxControlOption;
} ) => {
	return (
		<div
			className={ [
				'fincommerce-fulfillment-shipping-provider-list-item',
				'fincommerce-fulfillment-shipping-provider-list-item-' +
					item.value,
			].join( ' ' ) }
		>
			{ item.icon && (
				<div className="fincommerce-fulfillment-shipping-provider-list-item-icon">
					<img src={ item.icon } alt={ item.label } />
				</div>
			) }
			<div className="fincommerce-fulfillment-shipping-provider-list-item-label">
				{ item.label }
			</div>
		</div>
	);
};

export default function ShipmentManualEntryForm() {
	const {
		trackingNumber,
		setTrackingNumber,
		shipmentProvider,
		setShipmentProvider,
		providerName,
		setProviderName,
		trackingUrl,
		setTrackingUrl,
	} = useShipmentFormContext();
	return (
		<>
			<p className="fincommerce-fulfillment-description">
				{ __(
					'Provide the shipment information for this fulfillment.',
					'fincommerce'
				) }
			</p>
			<div className="fincommerce-fulfillment-input-container">
				<div className="fincommerce-fulfillment-input-group">
					<TextControl
						label={ __( 'Tracking Number', 'fincommerce' ) }
						type="text"
						placeholder={ __(
							'Enter tracking number',
							'fincommerce'
						) }
						value={ trackingNumber }
						onChange={ ( value: string ) => {
							setTrackingNumber( value );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</div>
			</div>
			<div className="fincommerce-fulfillment-input-container">
				<div className="fincommerce-fulfillment-input-group">
					<ComboboxControl
						label={ __( 'Provider', 'fincommerce' ) }
						__experimentalRenderItem={ ( { item } ) => (
							<ShippingProviderListItem item={ item } />
						) }
						allowReset={ false }
						__next40pxDefaultSize
						value={ shipmentProvider }
						options={ ShipmentProviders }
						onChange={ ( value ) => {
							setShipmentProvider( value as string );
						} }
						__nextHasNoMarginBottom
					/>
					<div className="fincommerce-fulfillment-shipment-provider-search-icon">
						<SearchIcon />
					</div>
				</div>
			</div>
			{ shipmentProvider === 'other' && (
				<div className="fincommerce-fulfillment-input-container">
					<div className="fincommerce-fulfillment-input-group">
						<TextControl
							label={ __( 'Provider Name', 'fincommerce' ) }
							type="text"
							placeholder={ __(
								'Enter provider name',
								'fincommerce'
							) }
							value={ providerName }
							onChange={ ( value: string ) => {
								setProviderName( value );
							} }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					</div>
				</div>
			) }
			<div className="fincommerce-fulfillment-input-container">
				<div className="fincommerce-fulfillment-input-group">
					<TextControl
						label={ __( 'Tracking URL', 'fincommerce' ) }
						type="text"
						placeholder={ __(
							'Enter tracking URL',
							'fincommerce'
						) }
						value={ trackingUrl }
						onChange={ ( value: string ) => {
							setTrackingUrl( value );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</div>
			</div>
		</>
	);
}
