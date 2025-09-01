/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { isBoolean } from '@fincommerce/types';
import { ToggleControl, Button, ExternalLink } from '@wordpress/components';
import styled from '@emotion/styled';

/**
 * Internal dependencies
 */
import {
	SettingsSection,
	SortableTable,
	SortableData,
} from '@fincommerce/block-library/assets/js/extensions/shipping-methods/shared-components';
import EditLocation from '@fincommerce/block-library/assets/js/extensions/shipping-methods/pickup-location/edit-location';
import type { SortablePickupLocation } from '@fincommerce/block-library/assets/js/extensions/shipping-methods/pickup-location/types';
import { useSettingsContext } from '@fincommerce/block-library/assets/js/extensions/shipping-methods/pickup-location/settings-context';
import { getUserFriendlyAddress } from '@fincommerce/block-library/assets/js/extensions/shipping-methods/pickup-location/utils';

const LocationSettingsDescription = () => (
	<>
		<h2>{ __( 'Pickup locations', 'fincommerce' ) }</h2>
		<p>
			{ __(
				'Define pickup locations for your customers to choose from during checkout.',
				'fincommerce'
			) }
		</p>
		<ExternalLink href="https://fincommerce.com/document/fincommerce-blocks-local-pickup/">
			{ __( 'Learn more', 'fincommerce' ) }
		</ExternalLink>
	</>
);

const StyledAddress = styled.address`
	color: #757575;
	font-style: normal;
	display: inline;
	margin-left: 12px;
`;

const LocationSettings = () => {
	const {
		pickupLocations,
		setPickupLocations,
		toggleLocation,
		updateLocation,
		readOnlySettings,
	} = useSettingsContext();
	const [ editingLocation, setEditingLocation ] =
		useState< UniqueIdentifier >( '' );

	const tableColumns = [
		{
			name: 'name',
			label: __( 'Pickup location', 'fincommerce' ),
			width: '50%',
			renderCallback: ( row: SortableData ): JSX.Element => (
				<>
					{ row.name }
					<StyledAddress>
						{ getUserFriendlyAddress( row.address ) }
					</StyledAddress>
				</>
			),
		},
		{
			name: 'enabled',
			label: __( 'Enabled', 'fincommerce' ),
			align: 'right',
			renderCallback: ( row: SortableData ): JSX.Element => (
				<ToggleControl
					checked={ isBoolean( row.enabled ) ? row.enabled : false }
					onChange={ () => toggleLocation( row.id ) }
				/>
			),
		},
		{
			name: 'edit',
			label: '',
			align: 'center',
			width: '1%',
			renderCallback: ( row: SortableData ): JSX.Element => (
				<button
					type="button"
					className="button-link-edit button-link"
					onClick={ () => {
						setEditingLocation( row.id );
					} }
				>
					{ __( 'Edit', 'fincommerce' ) }
				</button>
			),
		},
	];

	const FooterContent = (): JSX.Element => (
		<Button
			variant="secondary"
			onClick={ () => {
				setEditingLocation( 'new' );
			} }
		>
			{ __( 'Add pickup location', 'fincommerce' ) }
		</Button>
	);

	return (
		<SettingsSection Description={ LocationSettingsDescription }>
			<SortableTable
				className="pickup-locations"
				columns={ tableColumns }
				data={ pickupLocations }
				setData={ ( newData ) => {
					setPickupLocations( newData as SortablePickupLocation[] );
				} }
				placeholder={ __(
					'When you add a pickup location, it will appear here.',
					'fincommerce'
				) }
				footerContent={ FooterContent }
			/>
			{ editingLocation && (
				<EditLocation
					locationData={
						editingLocation === 'new'
							? {
									name: '',
									details: '',
									enabled: true,
									address: {
										address_1: '',
										city: '',
										state: readOnlySettings.storeState,
										postcode: '',
										country: readOnlySettings.storeCountry,
									},
							  }
							: pickupLocations.find( ( { id } ) => {
									return id === editingLocation;
							  } ) || null
					}
					editingLocation={ editingLocation }
					onSave={ ( values ) => {
						updateLocation(
							editingLocation,
							values as SortablePickupLocation
						);
					} }
					onClose={ () => setEditingLocation( '' ) }
					onDelete={ () => {
						updateLocation( editingLocation, null );
						setEditingLocation( '' );
					} }
				/>
			) }
		</SettingsSection>
	);
};

export default LocationSettings;
