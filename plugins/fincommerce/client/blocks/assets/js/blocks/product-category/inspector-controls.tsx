/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ProductCategoryControl from '@fincommerce/editor-components/product-category-control';
import GridLayoutControl from '@fincommerce/editor-components/grid-layout-control';
import { getSetting } from '@fincommerce/settings';
import GridContentControl from '@fincommerce/editor-components/grid-content-control';
import ProductOrderbyControl from '@fincommerce/editor-components/product-orderby-control';
import ProductStockControl from '@fincommerce/editor-components/product-stock-control';

/**
 * Internal dependencies
 */
import { Attributes, Props } from '@fincommerce/block-library/assets/js/blocks/product-category/types';

export interface InspectorControlsProps extends Props {
	isEditing: boolean;
	setChangedAttributes: ( changedAttributes: Partial< Attributes > ) => void;
}

export const ProductsByCategoryInspectorControls = (
	props: InspectorControlsProps
): JSX.Element => {
	const { isEditing, attributes, setAttributes, setChangedAttributes } =
		props;
	const {
		columns,
		catOperator,
		contentVisibility,
		orderby,
		rows,
		alignButtons,
		stockStatus,
	} = attributes;

	return (
		<InspectorControls key="inspector">
			<PanelBody
				title={ __( 'Product Category', 'fincommerce' ) }
				initialOpen={ ! attributes.categories.length && ! isEditing }
			>
				<ProductCategoryControl
					selected={ attributes.categories }
					onChange={ ( value = [] ) => {
						const ids = value.map( ( { id } ) => id );
						const changes = { categories: ids };

						// Changes in the sidebar save instantly and overwrite any unsaved changes.
						setAttributes( changes );
						setChangedAttributes( changes );
					} }
					operator={ catOperator }
					onOperatorChange={ ( value = 'any' ) => {
						const changes = { catOperator: value };
						setAttributes( changes );
						setChangedAttributes( changes );
					} }
					isCompact={ true }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Layout', 'fincommerce' ) } initialOpen>
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
			<PanelBody title={ __( 'Content', 'fincommerce' ) } initialOpen>
				<GridContentControl
					settings={ contentVisibility }
					onChange={ ( value ) =>
						setAttributes( { contentVisibility: value } )
					}
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Order By', 'fincommerce' ) }
				initialOpen={ false }
			>
				<ProductOrderbyControl
					setAttributes={ setAttributes }
					value={ orderby }
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Filter by stock status', 'fincommerce' ) }
				initialOpen={ false }
			>
				<ProductStockControl
					setAttributes={ setAttributes }
					value={ stockStatus }
				/>
			</PanelBody>
		</InspectorControls>
	);
};
