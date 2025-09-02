/**
 * External dependencies
 */
import { PanelBody } from '@finpress/components';
import { __ } from '@finpress/i18n';
import GridLayoutControl from '@fincommerce/editor-components/grid-layout-control';
import { getSetting } from '@fincommerce/settings';
import GridContentControl from '@fincommerce/editor-components/grid-content-control';
import ProductAttributeTermControl from '@fincommerce/editor-components/product-attribute-term-control';
import ProductOrderbyControl from '@fincommerce/editor-components/product-orderby-control';
import ProductStockControl from '@fincommerce/editor-components/product-stock-control';
import { InspectorControls } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { Props } from '@fincommerce/block-library/assets/js/blocks/products-by-attribute/types';

export const ProductsByAttributeInspectorControls = (
	props: Props
): JSX.Element => {
	const { setAttributes } = props;
	const {
		attributes,
		attrOperator,
		columns,
		contentVisibility,
		orderby,
		rows,
		alignButtons,
		stockStatus,
	} = props.attributes;

	return (
		<InspectorControls key="inspector">
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
				title={ __( 'Filter by Product Attribute', 'fincommerce' ) }
				initialOpen={ false }
			>
				<ProductAttributeTermControl
					selected={ attributes }
					onChange={ ( value = [] ) => {
						const result = value.map(
							( { id, value: attributeSlug } ) => ( {
								id,
								attr_slug: attributeSlug,
							} )
						);
						setAttributes( { attributes: result } );
					} }
					operator={ attrOperator }
					onOperatorChange={ ( value = 'any' ) =>
						setAttributes( { attrOperator: value } )
					}
					isCompact={ true }
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
