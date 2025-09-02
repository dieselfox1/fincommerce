/**
 * External dependencies
 */
import { useSelect } from '@finpress/data';
import { store as editorStore } from '@finpress/editor';

export function useEditorMode() {
	const { isEditingTemplate } = useSelect(
		( select ) => ( {
			isEditingTemplate:
				select( editorStore ).getCurrentPostType() === 'wp_template',
		} ),
		[]
	);
	return [ isEditingTemplate ? 'template' : 'email' ];
}
