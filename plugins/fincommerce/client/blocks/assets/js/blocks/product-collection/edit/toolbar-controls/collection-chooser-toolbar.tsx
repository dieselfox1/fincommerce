/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { ToolbarGroup, ToolbarButton } from '@finpress/components';

const CollectionChooserToolbar = ( props: {
	openCollectionSelectionModal: () => void;
} ) => {
	return (
		<ToolbarGroup>
			<ToolbarButton onClick={ props.openCollectionSelectionModal }>
				{ __( 'Choose collection', 'fincommerce' ) }
			</ToolbarButton>
		</ToolbarGroup>
	);
};

export default CollectionChooserToolbar;
