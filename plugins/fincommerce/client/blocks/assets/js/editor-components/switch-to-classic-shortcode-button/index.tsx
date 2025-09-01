/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, TabbableContainer, Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock, BlockInstance } from '@wordpress/blocks';
import { store as noticesStore } from '@wordpress/notices';
import { store as coreStore } from '@wordpress/core-data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { recordEvent } from '@fincommerce/tracks';
import { findBlock } from '@fincommerce/utils';

/**
 * Internal dependencies
 */
import { useCombinedIncompatibilityNotice } from '@fincommerce/block-library/assets/js/editor-components/incompatible-extension-notice/use-combined-incompatibility-notice';
import { ModalContent } from '@fincommerce/block-library/assets/js/editor-components/switch-to-classic-shortcode-button/modal-content';
import '@fincommerce/block-library/assets/js/editor-components/switch-to-classic-shortcode-button/editor.scss';

interface SwitchToClassicShortcodeButtonProps {
	block: 'fincommerce/cart' | 'fincommerce/checkout';
	clientId: string;
	type: 'incompatible' | 'generic';
}

export function SwitchToClassicShortcodeButton( {
	block,
	clientId,
	type,
}: SwitchToClassicShortcodeButtonProps ): JSX.Element {
	const { createInfoNotice } = useDispatch( noticesStore );
	const { replaceBlock, selectBlock } = useDispatch( blockEditorStore );

	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );
	const { undo } = useDispatch( coreStore );

	// Skipping the first two values in the array.
	const [ , , incompatibleExtensions, incompatibleExtensionsCount ] =
		useCombinedIncompatibilityNotice( block );

	const isCart = block === 'fincommerce/cart';

	const switchButtonLabel = isCart
		? __( 'Switch to classic cart', 'fincommerce' )
		: __( 'Switch to classic checkout', 'fincommerce' );

	const snackbarLabel = isCart
		? __( 'Switched to classic cart.', 'fincommerce' )
		: __( 'Switched to classic checkout.', 'fincommerce' );

	const notice =
		type === 'incompatible' ? 'incompatible_notice' : 'generic_notice';

	const shortcode = isCart ? 'cart' : 'checkout';

	const eventValue = {
		shortcode,
		notice,
		incompatible_extensions_count: incompatibleExtensionsCount,
		incompatible_extensions_names: JSON.stringify( incompatibleExtensions ),
	};

	const { getBlocks } = useSelect( ( select ) => {
		return {
			getBlocks: select( blockEditorStore ).getBlocks,
		};
	}, [] );

	const selectClassicShortcodeBlock = () => {
		const classicShortcodeBlock = findBlock( {
			blocks: getBlocks(),
			findCondition: ( foundBlock: BlockInstance ) =>
				foundBlock.name === 'fincommerce/classic-shortcode',
		} );

		if ( classicShortcodeBlock ) {
			selectBlock( classicShortcodeBlock.clientId );
		}
	};

	const handleSwitchToClassicShortcodeClick = () => {
		recordEvent( 'switch_to_classic_shortcode_click', eventValue );
		openModal();
	};

	const handleUndoClick = () => {
		undo();
		recordEvent( 'switch_to_classic_shortcode_undo', eventValue );
	};

	const handleSwitchClick = () => {
		replaceBlock(
			clientId,
			createBlock( 'fincommerce/classic-shortcode', {
				shortcode,
			} )
		);
		recordEvent( 'switch_to_classic_shortcode_confirm', eventValue );
		selectClassicShortcodeBlock();
		createInfoNotice( snackbarLabel, {
			actions: [
				{
					label: __( 'Undo', 'fincommerce' ),
					onClick: handleUndoClick,
				},
			],
			type: 'snackbar',
		} );
		closeModal();
	};

	const handleCancelClick = () => {
		recordEvent( 'switch_to_classic_shortcode_cancel', eventValue );
		closeModal();
	};

	return (
		<>
			<Button
				variant={ 'secondary' }
				onClick={ handleSwitchToClassicShortcodeClick }
			>
				{ switchButtonLabel }
			</Button>
			{ isOpen && (
				<Modal
					size="medium"
					title={ switchButtonLabel }
					onRequestClose={ closeModal }
					className="wc-blocks-switch-to-classic-shortcode-modal-content"
				>
					<ModalContent blockType={ block } />
					<TabbableContainer className="wc-blocks-switch-to-classic-shortcode-modal-actions">
						<Button
							variant="primary"
							isDestructive={ true }
							onClick={ handleSwitchClick }
						>
							{ __( 'Switch', 'fincommerce' ) }
						</Button>{ ' ' }
						<Button
							variant="secondary"
							onClick={ handleCancelClick }
						>
							{ __( 'Cancel', 'fincommerce' ) }
						</Button>
					</TabbableContainer>
				</Modal>
			) }
		</>
	);
}
