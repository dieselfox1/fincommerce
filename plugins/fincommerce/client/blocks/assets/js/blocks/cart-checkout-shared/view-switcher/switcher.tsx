/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useLayoutEffect } from '@finpress/element';
import { useSelect } from '@finpress/data';
import { ToolbarGroup, ToolbarDropdownMenu } from '@finpress/components';
import { BlockControls } from '@finpress/block-editor';
import { Icon } from '@finpress/icons';
import { eye } from '@fincommerce/icons';

/**
 * Internal dependencies
 */
import type { View } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/view-switcher/types';
import { getView, selectView } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/view-switcher/utils';

export const Switcher = ( {
	currentView,
	views,
	clientId,
}: {
	currentView: string;
	views: View[];
	clientId: string;
} ): JSX.Element | null => {
	const {
		getBlockName,
		getSelectedBlockClientId,
		getBlockParentsByBlockName,
	} = useSelect( ( select ) => {
		const blockEditor = select( 'core/block-editor' );
		return {
			getBlockName: blockEditor.getBlockName,
			getSelectedBlockClientId: blockEditor.getSelectedBlockClientId,
			getBlockParentsByBlockName: blockEditor.getBlockParentsByBlockName,
		};
	}, [] );
	const selectedBlockClientId = getSelectedBlockClientId();
	const currentViewObject = getView( currentView, views ) || views[ 0 ];
	const currentViewLabel = currentViewObject.label;

	useLayoutEffect( () => {
		const selectedBlock = selectedBlockClientId
			? getBlockName( selectedBlockClientId )
			: null;

		// If there is no selected block, or the selected block is the current view, do nothing.
		if ( ! selectedBlock || currentView === selectedBlock ) {
			return;
		}

		const viewNames = views.map( ( view ) => view.view );

		if ( viewNames.includes( selectedBlock ) ) {
			selectView( clientId, selectedBlock );
			return;
		}

		// Look at the parent blocks to see if any of them are a view we can select.
		const parentBlockClientIds = getBlockParentsByBlockName(
			selectedBlockClientId,
			viewNames
		);

		const parentBlock =
			parentBlockClientIds.length === 1
				? getBlockName( parentBlockClientIds[ 0 ] )
				: null;

		// If there is no parent block, or the parent block is the current view, do nothing.
		if ( ! parentBlock || currentView === parentBlock ) {
			return;
		}

		selectView( clientId, parentBlock, false );
	}, [
		clientId,
		currentView,
		getBlockName,
		getBlockParentsByBlockName,
		selectedBlockClientId,
		views,
	] );

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					label={ __( 'Switch view', 'fincommerce' ) }
					text={ currentViewLabel }
					icon={
						<Icon icon={ eye } style={ { marginRight: '8px' } } />
					}
					controls={ views.map( ( view ) => ( {
						...view,
						title: (
							<span style={ { marginLeft: '8px' } }>
								{ view.label }
							</span>
						),
						isActive: view.view === currentView,
						onClick: () => {
							selectView( clientId, view.view );
						},
					} ) ) }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
};

export default Switcher;
