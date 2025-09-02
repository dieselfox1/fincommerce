/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { BlockControls } from '@finpress/block-editor';
import { ToolbarGroup } from '@finpress/components';

interface EditorBlockControlsProps {
	isEditing: boolean;
	setIsEditing: ( isEditing: boolean ) => void;
}

const EditorBlockControls = ( {
	isEditing,
	setIsEditing,
}: EditorBlockControlsProps ) => {
	return (
		<BlockControls>
			<ToolbarGroup
				controls={ [
					{
						icon: 'edit',
						title: __( 'Edit selected product', 'fincommerce' ),
						onClick: () => setIsEditing( ! isEditing ),
						isActive: isEditing,
					},
				] }
			/>
		</BlockControls>
	);
};

export default EditorBlockControls;
