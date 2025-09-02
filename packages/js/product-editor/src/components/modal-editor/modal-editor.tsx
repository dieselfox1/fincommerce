/**
 * External dependencies
 */
import { BlockInstance } from '@finpress/blocks';
import { createElement } from '@finpress/element';
import { useDispatch } from '@finpress/data';
import {
	EditorSettings,
	EditorBlockListSettings,
} from '@finpress/block-editor';
import { Modal } from '@finpress/components';
import { useDebounce } from '@finpress/compose';

/**
 * Internal dependencies
 */
import { IframeEditor } from '../iframe-editor';
import { wooProductEditorUiStore } from '../../store/product-editor-ui';

type ModalEditorProps = {
	initialBlocks?: BlockInstance[];
	onChange?: ( blocks: BlockInstance[] ) => void;
	onClose?: () => void;
	settings?: Partial< EditorSettings & EditorBlockListSettings > | undefined;
	title: string;
	name: string;
};

export function ModalEditor( {
	initialBlocks,
	onChange,
	onClose,
	title,
	name,
}: ModalEditorProps ) {
	const { closeModalEditor } = useDispatch( wooProductEditorUiStore );

	const debouncedOnChange = useDebounce( ( blocks: BlockInstance[] ) => {
		onChange?.( blocks );
	}, 250 );

	function handleClose() {
		const blocks = debouncedOnChange.flush();
		if ( blocks ) {
			onChange?.( blocks );
		}
		closeModalEditor();
		onClose?.();
	}

	return (
		<Modal
			className="fincommerce-modal-editor"
			title={ title }
			onRequestClose={ handleClose }
			shouldCloseOnClickOutside={ false }
		>
			<IframeEditor
				initialBlocks={ initialBlocks }
				onInput={ debouncedOnChange }
				onChange={ debouncedOnChange }
				onClose={ handleClose }
				name={ name }
			/>
		</Modal>
	);
}
