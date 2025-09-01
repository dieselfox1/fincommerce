/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import GridLayoutControl from '@fincommerce/editor-components/grid-layout-control';
import { getSetting } from '@fincommerce/settings';
import GridContentControl from '@fincommerce/editor-components/grid-content-control';
import ProductCategoryControl from '@fincommerce/editor-components/product-category-control';

/**
 * Internal dependencies
 */
import { Props } from '@fincommerce/block-library/assets/js/blocks/product-best-sellers/types';

export const ProductBestSellersInspectorControls = (
	props: Props
): JSX.Element => {
	const { attributes, setAttributes } = props;
	const {
		categories,
		catOperator,
		columns,
		contentVisibility,
		rows,
		alignButtons,
	} = attributes;

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
				title={ __( 'Filter by Product Category', 'fincommerce' ) }
				initialOpen={ false }
			>
				<ProductCategoryControl
					selected={ categories }
					onChange={ ( value = [] ) => {
						const ids = value.map( ( { id } ) => id );
						setAttributes( { categories: ids } );
					} }
					operator={ catOperator }
					onOperatorChange={ ( value = 'any' ) =>
						setAttributes( { catOperator: value } )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
};
