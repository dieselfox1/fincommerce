/**
 * External dependencies
 */
import { ToolbarButton, ToolbarGroup } from '@finpress/components';
import { useDispatch } from '@finpress/data';
import { __ } from '@finpress/i18n';
import { trash } from '@finpress/icons';
import { store as blockEditorStore } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { trackEvent } from '~/customize-store/tracking';

export default function Delete( {
	clientId,
	currentBlockName,
	nextBlockClientId,
}: {
	clientId: string;
	currentBlockName: string | undefined;
	nextBlockClientId: string | undefined;
} ) {
	const { removeBlock, selectBlock } = useDispatch( blockEditorStore );

	return (
		<ToolbarGroup>
			<ToolbarButton
				showTooltip={ true }
				label={ __( 'Delete', 'fincommerce' ) }
				icon={ trash }
				onClick={ () => {
					removeBlock( clientId );
					if ( nextBlockClientId ) {
						selectBlock( nextBlockClientId );
					}
					trackEvent(
						'customize_your_store_assembler_pattern_delete_click',
						{ pattern: currentBlockName }
					);
				} }
			/>
		</ToolbarGroup>
	);
}
