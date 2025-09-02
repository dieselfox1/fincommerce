/**
 * External dependencies
 */
import { useDispatch } from '@finpress/data';
import { __ } from '@finpress/i18n';
import { external } from '@finpress/icons';
// eslint-disable-next-line @fincommerce/dependency-group
import {
	// @ts-expect-error Type for PluginPreviewMenuItem is missing in @types/finpress__editor
	PluginPreviewMenuItem,
} from '@finpress/editor';

/**
 * Internal dependencies
 */
import { storeName } from '../../store/constants';
import { SendPreviewEmail } from './send-preview-email';
import { recordEvent } from '../../events';

export function SendPreview() {
	const { togglePreviewModal } = useDispatch( storeName );

	return (
		<>
			<PluginPreviewMenuItem
				icon={ external }
				onClick={ () => {
					recordEvent(
						'header_preview_dropdown_send_test_email_selected'
					);
					togglePreviewModal( true );
				} }
			>
				{ __( 'Send a test email', 'fincommerce' ) }
			</PluginPreviewMenuItem>
			<SendPreviewEmail />
		</>
	);
}
