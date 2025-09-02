/**
 * External dependencies
 */
import { Button, Modal, TextControl } from '@finpress/components';
import { __ } from '@finpress/i18n';
import { useState } from '@finpress/element';

const LinkModal = ( { onInsert, isOpened, closeCallback, tag } ) => {
	const [ linkText, setLinkText ] = useState( __( 'Link', 'fincommerce' ) );
	if ( ! isOpened ) {
		return null;
	}

	return (
		<Modal
			size="small"
			title={ __( 'Insert Link', 'fincommerce' ) }
			onRequestClose={ closeCallback }
			className="fincommerce-personalization-tags-modal"
		>
			<TextControl
				label={ __( 'Link Text', 'fincommerce' ) }
				value={ linkText }
				onChange={ setLinkText }
			/>
			<Button
				isPrimary
				onClick={ () => {
					if ( onInsert ) {
						onInsert( tag.token, linkText );
					}
				} }
			>
				{ __( 'Insert', 'fincommerce' ) }
			</Button>
		</Modal>
	);
};

export { LinkModal };
