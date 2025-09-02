/**
 * External dependencies
 */
import { store as blockEditorStore } from '@finpress/block-editor';
import { serialize } from '@finpress/blocks';
import { MenuItem } from '@finpress/components';
import { useCopyToClipboard } from '@finpress/compose';
import { useDispatch, useSelect } from '@finpress/data';
import { createElement } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { recordEvent } from '@fincommerce/tracks';

export const CopyAllContentMenuItem = () => {
	const { createNotice } = useDispatch( 'core/notices' );

	const { blocks } = useSelect( ( select ) => {
		const {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore These selectors are available in the block data store.
			getBlocks,
		} = select( blockEditorStore );

		return {
			blocks: getBlocks(),
		};
	}, [] );

	const getText = () => {
		return serialize( blocks );
	};

	const recordClick = () => {
		recordEvent( 'product_iframe_editor_copy_all_content_menu_item_click' );
	};

	const onCopySuccess = () => {
		createNotice( 'success', __( 'All content copied.', 'fincommerce' ) );
	};

	const ref = useCopyToClipboard( getText, onCopySuccess );

	return (
		<MenuItem
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore ref is okay here
			ref={ ref }
			role="menuitem"
			onClick={ recordClick }
			disabled={ ! blocks.length }
		>
			{ __( 'Copy all content', 'fincommerce' ) }
		</MenuItem>
	);
};
