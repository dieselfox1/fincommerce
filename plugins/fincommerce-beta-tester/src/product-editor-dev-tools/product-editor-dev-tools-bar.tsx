/**
 * External dependencies
 */
import { useContext, useEffect, useState } from 'react';
import { WooFooterItem } from '@fincommerce/admin-layout';
import { PostTypeContext } from '@fincommerce/product-editor';
import { Button, NavigableMenu } from '@finpress/components';
import { __ } from '@finpress/i18n';
import { closeSmall } from '@finpress/icons';
import { useSelect } from '@finpress/data';
import { useEntityProp, store as coreDataStore } from '@finpress/core-data';

import { store as blockEditorStore } from '@finpress/block-editor';
import { Product } from '@fincommerce/data';

/**
 * Internal dependencies
 */
import { BlockInspectorTabPanel } from './block-inspector-tab-panel';
import { HelpTabPanel } from './help-tab-panel';
import { ProductTabPanel } from './product-tab-panel';
import { UserPreferencesTabPanel } from './user-preferences-panel';

function TabButton( {
	name,
	selectedTab,
	onClick,
	children,
}: {
	name: string;
	selectedTab: string;
	onClick: ( name: string ) => void;
	children: React.ReactNode;
} ) {
	return (
		<Button
			onClick={ () => onClick( name ) }
			aria-selected={ name === selectedTab }
			className="fincommerce-product-editor-dev-tools-bar__tab-button"
		>
			{ children }
		</Button>
	);
}

export function ProductEditorDevToolsBar( {
	onClose,
}: {
	onClose: () => void;
} ) {
	const postType = useContext( PostTypeContext );

	const [ id ] = useEntityProp( 'postType', postType, 'id' );

	const product = useSelect(
		( select ) =>
			// @ts-expect-error type definition is not correct. For this reason, we need to cast the return value to Product.
			select( coreDataStore ).getEditedEntityRecord(
				'postType',
				postType,
				id
			) as Product,
		[ id, postType ]
	);

	const [ lastSelectedBlock, setLastSelectedBlock ] = useState( null );

	const selectedBlock = useSelect(
		// @ts-expect-error No types for this exist yet. Need to add it to the blockEditorStore types.
		( select ) => select( blockEditorStore ).getSelectedBlock(),
		[ id, postType ]
	);

	useEffect( () => {
		if ( selectedBlock !== null ) {
			setLastSelectedBlock( selectedBlock );
		}
	}, [ selectedBlock ] );

	const evaluationContext: {
		postType: string;
		editedProduct: Product;
	} = {
		postType,
		editedProduct: product,
	};

	const [ selectedTab, setSelectedTab ] = useState< string >( 'inspector' );

	function handleNavigate( _childIndex: number, child: HTMLElement ) {
		child.click();
	}

	function handleTabClick( tabName: string ) {
		setSelectedTab( tabName );
	}

	return (
		<WooFooterItem>
			<div className="fincommerce-product-editor-dev-tools-bar">
				<div className="fincommerce-product-editor-dev-tools-bar__header">
					<div className="fincommerce-product-editor-dev-tools-bar__tabs">
						<NavigableMenu
							role="tablist"
							orientation="horizontal"
							onNavigate={ handleNavigate }
						>
							<TabButton
								name="inspector"
								selectedTab={ selectedTab }
								onClick={ handleTabClick }
							>
								{ __( 'Block Inspector', 'fincommerce' ) }
							</TabButton>
							<TabButton
								name="product"
								selectedTab={ selectedTab }
								onClick={ handleTabClick }
							>
								{ __( 'Product', 'fincommerce' ) }
							</TabButton>

							<TabButton
								name="user-preferences"
								selectedTab={ selectedTab }
								onClick={ handleTabClick }
							>
								{ __( 'User Preferences', 'fincommerce' ) }
							</TabButton>

							<TabButton
								name="help"
								selectedTab={ selectedTab }
								onClick={ handleTabClick }
							>
								{ __( 'Help', 'fincommerce' ) }
							</TabButton>
						</NavigableMenu>
					</div>
					<div className="fincommerce-product-editor-dev-tools-bar__actions">
						<Button
							icon={ closeSmall }
							label={ __( 'Close', 'fincommerce' ) }
							onClick={ onClose }
						/>
					</div>
				</div>
				<div className="fincommerce-product-editor-dev-tools-bar__panel">
					<BlockInspectorTabPanel
						selectedBlock={ lastSelectedBlock }
						isSelected={ selectedTab === 'inspector' }
					/>
					<ProductTabPanel
						evaluationContext={ evaluationContext }
						isSelected={ selectedTab === 'product' }
					/>
					<UserPreferencesTabPanel
						isSelected={ selectedTab === 'user-preferences' }
					/>
					<HelpTabPanel isSelected={ selectedTab === 'help' } />
				</div>
			</div>
		</WooFooterItem>
	);
}
