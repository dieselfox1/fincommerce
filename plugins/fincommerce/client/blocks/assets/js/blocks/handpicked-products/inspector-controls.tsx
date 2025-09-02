/**
 * External dependencies
 */
import { InspectorControls } from '@finpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@finpress/components';
import { __ } from '@finpress/i18n';
import { getSetting } from '@fincommerce/settings';
import GridContentControl from '@fincommerce/editor-components/grid-content-control';
import ProductOrderbyControl from '@fincommerce/editor-components/product-orderby-control';
import ProductsControl from '@fincommerce/editor-components/products-control';

/**
 * Internal dependencies
 */
import { Props } from '@fincommerce/block-library/assets/js/blocks/handpicked-products/types';

export const HandpickedProductsInspectorControls = (
	props: Props
): JSX.Element => {
	const { attributes, setAttributes } = props;
	const { columns, contentVisibility, orderby, alignButtons } = attributes;

	return (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Layout', 'fincommerce' ) } initialOpen>
				<RangeControl
					label={ __( 'Columns', 'fincommerce' ) }
					value={ columns }
					onChange={ ( value ) =>
						setAttributes( { columns: value } )
					}
					min={ getSetting( 'minColumns', 1 ) }
					max={ getSetting( 'maxColumns', 6 ) }
				/>
				<ToggleControl
					label={ __( 'Align Buttons', 'fincommerce' ) }
					help={
						alignButtons
							? __(
									'Buttons are aligned vertically.',
									'fincommerce'
							  )
							: __( 'Buttons follow content.', 'fincommerce' )
					}
					checked={ alignButtons }
					onChange={ () =>
						setAttributes( { alignButtons: ! alignButtons } )
					}
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
				title={ __( 'Products', 'fincommerce' ) }
				initialOpen={ false }
			>
				<ProductsControl
					selected={ attributes.products }
					onChange={ ( value = [] ) => {
						const ids = value.map( ( { id } ) => id );
						setAttributes( { products: ids } );
					} }
					isCompact={ true }
				/>
			</PanelBody>
		</InspectorControls>
	);
};
