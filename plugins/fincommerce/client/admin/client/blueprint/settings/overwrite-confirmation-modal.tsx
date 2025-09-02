/**
 * External dependencies
 */
import { Modal, Button, Spinner } from '@finpress/components';
import { __ } from '@finpress/i18n';
import clsx from 'clsx';

type OverwriteConfirmationModalProps = {
	isOpen: boolean;
	isImporting: boolean;
	onClose: () => void;
	onConfirm: () => void;
	overwrittenItems: string[];
};

export const OverwriteConfirmationModal = ( {
	isOpen,
	isImporting,
	onClose,
	onConfirm,
	overwrittenItems,
}: OverwriteConfirmationModalProps ) => {
	if ( ! isOpen ) return null;
	return (
		<Modal
			title={ __(
				'Your configuration will be overridden',
				'fincommerce'
			) }
			onRequestClose={ onClose }
			className="fincommerce-blueprint-overwrite-modal"
			isDismissible={ ! isImporting }
		>
			<p className="fincommerce-blueprint-overwrite-modal__description">
				{ overwrittenItems.length
					? __(
							'Importing the file will overwrite the current configuration for the following items in FinCommerce Settings:',
							'fincommerce'
					  )
					: __(
							'Importing the file will overwrite the current configuration in FinCommerce Settings.',
							'fincommerce'
					  ) }
			</p>

			<ul className="fincommerce-blueprint-overwrite-modal__list">
				{ overwrittenItems.map( ( item ) => (
					<li key={ item }>{ item }</li>
				) ) }
			</ul>

			<div className="fincommerce-blueprint-overwrite-modal__actions">
				<Button
					className="fincommerce-blueprint-overwrite-modal__actions-cancel"
					variant="tertiary"
					onClick={ onClose }
					disabled={ isImporting }
				>
					{ __( 'Cancel', 'fincommerce' ) }
				</Button>
				<Button
					className={ clsx(
						'fincommerce-blueprint-overwrite-modal__actions-import',
						{
							'is-importing': isImporting,
						}
					) }
					variant="primary"
					onClick={ onConfirm }
				>
					{ isImporting ? (
						<Spinner />
					) : (
						__( 'Import', 'fincommerce' )
					) }
				</Button>
			</div>
		</Modal>
	);
};
