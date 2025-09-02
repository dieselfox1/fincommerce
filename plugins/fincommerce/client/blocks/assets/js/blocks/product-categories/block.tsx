/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { InspectorControls, useBlockProps } from '@finpress/block-editor';
import ServerSideRender from '@finpress/server-side-render';
import { Icon, listView } from '@finpress/icons';
import { isSiteEditorPage, isWidgetEditorPage } from '@fincommerce/utils';
import { useSelect } from '@finpress/data';
import {
	Disabled,
	PanelBody,
	ToggleControl,
	Placeholder,

	// @ts-expect-error - no types.
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,

	// @ts-expect-error - no types.
	// eslint-disable-next-line @finpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@finpress/components';
/**
 * Internal dependencies
 */
import type { ProductCategoriesBlockProps } from '@fincommerce/block-library/assets/js/blocks/product-categories/types';

const EmptyPlaceholder = () => (
	<Placeholder
		icon={ <Icon icon={ listView } /> }
		label={ __( 'Product Categories List', 'fincommerce' ) }
		className="wc-block-product-categories"
	>
		{ __(
			'This block displays the product categories for your store. To use it you first need to create a product and assign it to a category.',
			'fincommerce'
		) }
	</Placeholder>
);

/**
 * Component displaying the categories as dropdown or list.
 *
 * @param {Object}            props               Incoming props for the component.
 * @param {Object}            props.attributes    Incoming block attributes.
 * @param {function(any):any} props.setAttributes Setter for block attributes.
 * @param {string}            props.name          Name for block.
 */
const ProductCategoriesBlock = ( {
	attributes,
	setAttributes,
	name,
}: ProductCategoriesBlockProps ) => {
	const editWidgetStore = useSelect(
		( select ) => select( 'core/edit-widgets' ),
		[]
	);
	const isSiteEditor = isSiteEditorPage();
	const isWidgetEditor = isWidgetEditorPage( editWidgetStore );
	const getInspectorControls = () => {
		const {
			hasCount,
			hasImage,
			hasEmpty,
			isDropdown,
			isHierarchical,
			showChildrenOnly,
		} = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'List Settings', 'fincommerce' ) }
					initialOpen
				>
					<ToggleGroupControl
						label={ __( 'Display style', 'fincommerce' ) }
						isBlock
						value={ isDropdown ? 'dropdown' : 'list' }
						onChange={ ( value: string ) =>
							setAttributes( {
								isDropdown: value === 'dropdown',
							} )
						}
					>
						<ToggleGroupControlOption
							value="list"
							label={ __( 'List', 'fincommerce' ) }
						/>
						<ToggleGroupControlOption
							value="dropdown"
							label={ __( 'Dropdown', 'fincommerce' ) }
						/>
					</ToggleGroupControl>
				</PanelBody>
				<PanelBody title={ __( 'Content', 'fincommerce' ) } initialOpen>
					<ToggleControl
						label={ __( 'Show product count', 'fincommerce' ) }
						checked={ hasCount }
						onChange={ () =>
							setAttributes( { hasCount: ! hasCount } )
						}
					/>
					{ ! isDropdown && (
						<ToggleControl
							label={ __(
								'Show category images',
								'fincommerce'
							) }
							help={
								hasImage
									? __(
											'Category images are visible.',
											'fincommerce'
									  )
									: __(
											'Category images are hidden.',
											'fincommerce'
									  )
							}
							checked={ hasImage }
							onChange={ () =>
								setAttributes( { hasImage: ! hasImage } )
							}
						/>
					) }
					<ToggleControl
						label={ __( 'Show hierarchy', 'fincommerce' ) }
						checked={ isHierarchical }
						onChange={ () =>
							setAttributes( {
								isHierarchical: ! isHierarchical,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Show empty categories', 'fincommerce' ) }
						checked={ hasEmpty }
						onChange={ () =>
							setAttributes( { hasEmpty: ! hasEmpty } )
						}
					/>
					{ ( isSiteEditor || isWidgetEditor ) && (
						<ToggleControl
							label={ __(
								'Only show children of current category',
								'fincommerce'
							) }
							help={ __(
								'This will affect product category pages',
								'fincommerce'
							) }
							checked={ showChildrenOnly }
							onChange={ () =>
								setAttributes( {
									showChildrenOnly: ! showChildrenOnly,
								} )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
		);
	};

	const blockProps = useBlockProps( {
		className: 'wc-block-product-categories',
	} );

	return (
		<div { ...blockProps }>
			{ getInspectorControls() }
			<Disabled>
				<ServerSideRender
					block={ name }
					attributes={ attributes }
					EmptyResponsePlaceholder={ EmptyPlaceholder }
				/>
			</Disabled>
		</div>
	);
};

export default ProductCategoriesBlock;
