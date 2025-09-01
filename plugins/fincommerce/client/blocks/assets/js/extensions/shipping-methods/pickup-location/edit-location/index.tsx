/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';
import type { UniqueIdentifier } from '@dnd-kit/core';

/**
 * Internal dependencies
 */
import { SettingsModal } from '@fincommerce/block-library/assets/js/extensions/shipping-methods/shared-components';
import Form from '@fincommerce/block-library/assets/js/extensions/shipping-methods/pickup-location/edit-location/form';
import type { PickupLocation } from '@fincommerce/block-library/assets/js/extensions/shipping-methods/pickup-location/types';

const EditLocation = ( {
	locationData,
	editingLocation,
	onClose,
	onSave,
	onDelete,
}: {
	locationData: PickupLocation | null;
	editingLocation: UniqueIdentifier | 'new';
	onClose: () => void;
	onSave: ( location: PickupLocation ) => void;
	onDelete: () => void;
} ): JSX.Element | null => {
	const formRef = useRef( null );
	const [ values, setValues ] = useState< PickupLocation >(
		locationData as PickupLocation
	);

	if ( ! locationData ) {
		return null;
	}

	return (
		<SettingsModal
			onRequestClose={ onClose }
			title={
				editingLocation === 'new'
					? __( 'Pickup location', 'fincommerce' )
					: __( 'Edit pickup location', 'fincommerce' )
			}
			actions={
				<>
					{ editingLocation !== 'new' && (
						<Button
							variant="link"
							className="button-link-delete"
							onClick={ () => {
								onDelete();
								onClose();
							} }
						>
							{ __( 'Delete location', 'fincommerce' ) }
						</Button>
					) }
					<Button variant="secondary" onClick={ onClose }>
						{ __( 'Cancel', 'fincommerce' ) }
					</Button>
					<Button
						variant="primary"
						onClick={ () => {
							const form =
								formRef?.current as unknown as HTMLFormElement;
							if ( form.reportValidity() ) {
								onSave( values );
								onClose();
							}
						} }
					>
						{ __( 'Done', 'fincommerce' ) }
					</Button>
				</>
			}
		>
			<Form
				formRef={ formRef }
				values={ values }
				setValues={ setValues }
			/>
		</SettingsModal>
	);
};

export default EditLocation;
