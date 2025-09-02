/**
 * External dependencies
 */
import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@finpress/block-editor';
import { createBlock } from '@finpress/blocks';
import {
	Button,
	Disabled,
	PanelBody,
	Placeholder,
	Tip,
	ToolbarGroup,
	withSpokenMessages,
} from '@finpress/components';
import { compose } from '@finpress/compose';
import { withDispatch, withSelect } from '@finpress/data';
import { useState } from '@finpress/element';
import { __ } from '@finpress/i18n';
import { Icon, grid } from '@finpress/icons';
import { getBlockMap } from '@fincommerce/atomic-utils';
import { blocksConfig } from '@fincommerce/block-settings';
import GridLayoutControl from '@fincommerce/editor-components/grid-layout-control';
import { previewProducts } from '@fincommerce/resource-previews';
import { getSetting } from '@fincommerce/settings';
import {
	InnerBlockLayoutContextProvider,
	ProductDataContextProvider,
} from '@fincommerce/shared-context';

/**
 * Internal dependencies
 */
import {
	DEFAULT_PRODUCT_LIST_LAYOUT,
	getProductLayoutConfig,
} from '@fincommerce/block-library/assets/js/blocks/products/base-utils';
import { getSharedContentControls, getSharedListControls } from '@fincommerce/block-library/assets/js/blocks/products/edit';
import {
	renderHiddenContentPlaceholder,
	renderNoProductsPlaceholder,
} from '@fincommerce/block-library/assets/js/blocks/products/edit-utils';
import { getBlockClassName } from '@fincommerce/block-library/assets/js/blocks/products/utils';
import Block from '@fincommerce/block-library/assets/js/blocks/products/all-products/block';
import metadata from '@fincommerce/block-library/assets/js/blocks/products/all-products/block.json';
import '@fincommerce/block-library/assets/js/blocks/products/all-products/editor.scss';

const blockMap = getBlockMap( 'fincommerce/all-products' );

const blockIcon = <Icon icon={ grid } />;

const Edit = ( {
	block,
	attributes,
	setAttributes,
	debouncedSpeak,
	replaceInnerBlocks,
} ) => {
	const [ isEditing, setIsEditing ] = useState( false );
	const [ innerBlocks, setInnerBlocks ] = useState( [] );

	const blockProps = useBlockProps( {
		className: getBlockClassName( 'wc-block-all-products', attributes ),
	} );

	if ( blocksConfig.productCount === 0 ) {
		return renderNoProductsPlaceholder(
			metadata.title,
			<Icon icon={ grid } />
		);
	}

	const togglePreview = () => {
		setIsEditing( ! isEditing );

		if ( ! isEditing ) {
			debouncedSpeak(
				__( 'Showing All Products block preview.', 'fincommerce' )
			);
		}
	};

	const getInspectorControls = () => {
		const { columns, rows, alignButtons } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Layout Settings', 'fincommerce' ) }
					initialOpen
				>
					<GridLayoutControl
						columns={ columns }
						rows={ rows }
						alignButtons={ alignButtons }
						setAttributes={ setAttributes }
						minColumns={ getSetting( 'minColumns', 1 ) }
						maxColumns={ getSetting( 'maxColumns', 6 ) }
						minRows={ getSetting( 'minRows', 1 ) }
						maxRows={ getSetting( 'maxRows', 6 ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Content Settings', 'fincommerce' ) }>
					{ getSharedContentControls( attributes, setAttributes ) }
					{ getSharedListControls( attributes, setAttributes ) }
				</PanelBody>
			</InspectorControls>
		);
	};

	const getBlockControls = () => {
		return (
			<BlockControls>
				<ToolbarGroup
					controls={ [
						{
							icon: 'edit',
							title: __(
								'Edit the layout of each product',
								'fincommerce'
							),
							onClick: () => togglePreview(),
							isActive: isEditing,
						},
					] }
				/>
			</BlockControls>
		);
	};

	const renderEditMode = () => {
		const onDone = () => {
			setAttributes( {
				layoutConfig: getProductLayoutConfig( block.innerBlocks ),
			} );
			setInnerBlocks( block.innerBlocks );
			togglePreview();
		};

		const onCancel = () => {
			replaceInnerBlocks( block.clientId, innerBlocks, false );
			togglePreview();
		};

		const onReset = () => {
			const newBlocks = [];
			DEFAULT_PRODUCT_LIST_LAYOUT.map( ( [ name, blockAttributes ] ) => {
				newBlocks.push( createBlock( name, blockAttributes ) );
				return true;
			} );
			replaceInnerBlocks( block.clientId, newBlocks, false );
			setInnerBlocks( block.innerBlocks );
		};

		const InnerBlockProps = {
			template: attributes.layoutConfig,
			templateLock: false,
			allowedBlocks: Object.keys( blockMap ),
		};

		if ( attributes.layoutConfig.length !== 0 ) {
			InnerBlockProps.renderAppender = false;
		}

		return (
			<Placeholder icon={ blockIcon } label={ metadata.title }>
				{ __(
					'Display all products from your store as a grid.',
					'fincommerce'
				) }
				<div className="wc-block-all-products-grid-item-template">
					<Tip>
						{ __(
							'Edit the blocks inside the example below to change the content displayed for all products within the product grid.',
							'fincommerce'
						) }
					</Tip>
					<InnerBlockLayoutContextProvider
						parentName="fincommerce/all-products"
						parentClassName="wc-block-grid"
					>
						<div className="wc-block-grid wc-block-layout has-1-columns">
							<ul className="wc-block-grid__products">
								<li className="wc-block-grid__product">
									<ProductDataContextProvider
										product={ previewProducts[ 0 ] }
									>
										<InnerBlocks { ...InnerBlockProps } />
									</ProductDataContextProvider>
								</li>
							</ul>
						</div>
					</InnerBlockLayoutContextProvider>
					<div className="wc-block-all-products__actions">
						<Button
							className="wc-block-all-products__done-button"
							variant="primary"
							onClick={ onDone }
						>
							{ __( 'Done', 'fincommerce' ) }
						</Button>
						<Button
							className="wc-block-all-products__cancel-button"
							variant="tertiary"
							onClick={ onCancel }
						>
							{ __( 'Cancel', 'fincommerce' ) }
						</Button>
						<Button
							className="wc-block-all-products__reset-button"
							icon={ blockIcon }
							label={ __(
								'Reset layout to default',
								'fincommerce'
							) }
							onClick={ onReset }
						>
							{ __( 'Reset Layout', 'fincommerce' ) }
						</Button>
					</div>
				</div>
			</Placeholder>
		);
	};

	const renderViewMode = () => {
		const { layoutConfig } = attributes;
		const hasContent = layoutConfig && layoutConfig.length !== 0;
		const blockTitle = metadata.title;

		if ( ! hasContent ) {
			return renderHiddenContentPlaceholder( blockTitle, blockIcon );
		}

		return (
			<Disabled>
				<Block attributes={ attributes } />
			</Disabled>
		);
	};

	return (
		<div { ...blockProps }>
			{ getBlockControls() }
			{ getInspectorControls() }
			{ isEditing ? renderEditMode() : renderViewMode() }
		</div>
	);
};

export default compose(
	withSpokenMessages,
	withSelect( ( select, { clientId } ) => {
		const { getBlock } = select( 'core/block-editor' );
		return {
			block: getBlock( clientId ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
		return {
			replaceInnerBlocks,
		};
	} )
)( Edit );
