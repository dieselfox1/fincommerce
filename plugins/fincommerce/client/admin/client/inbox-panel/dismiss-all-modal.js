/**
 * External dependencies
 */
import { notesStore } from '@fincommerce/data';
import { recordEvent } from '@fincommerce/tracks';
import { useDispatch } from '@wordpress/data';
import { Button, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const DismissAllModal = ( { onClose } ) => {
	const { createNotice } = useDispatch( 'core/notices' );

	const { batchUpdateNotes, removeAllNotes } = useDispatch( notesStore );

	const dismissAllNotes = async () => {
		recordEvent( 'wcadmin_inbox_action_dismissall', {} );
		try {
			const notesRemoved = await removeAllNotes( {
				status: 'unactioned',
			} );
			createNotice(
				'success',
				__( 'All messages dismissed', 'fincommerce' ),
				{
					actions: [
						{
							label: __( 'Undo', 'fincommerce' ),
							onClick: () => {
								batchUpdateNotes(
									notesRemoved.map( ( note ) => note.id ),
									{
										is_deleted: 0,
									}
								);
							},
						},
					],
				}
			);
		} catch ( e ) {
			createNotice(
				'error',
				__( 'Messages could not be dismissed', 'fincommerce' )
			);
			onClose();
		}
	};
	return (
		<>
			<Modal
				title={ __( 'Dismiss all messages', 'fincommerce' ) }
				className="fincommerce-inbox-dismiss-all-modal"
				onRequestClose={ onClose }
			>
				<div className="fincommerce-inbox-dismiss-all-modal__wrapper">
					<div className="fincommerce-usage-modal__message">
						{ __(
							'Are you sure? Inbox messages will be dismissed forever.',
							'fincommerce'
						) }
					</div>
					<div className="fincommerce-usage-modal__actions">
						<Button onClick={ onClose }>
							{ __( 'Cancel', 'fincommerce' ) }
						</Button>
						<Button
							isPrimary
							onClick={ () => {
								dismissAllNotes();
								onClose();
							} }
						>
							{ __( 'Yes, dismiss all', 'fincommerce' ) }
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default DismissAllModal;
