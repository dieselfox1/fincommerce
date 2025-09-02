/**
 * External dependencies
 */
import { InspectorControls } from '@finpress/block-editor';
import { PanelBody, ToggleControl } from '@finpress/components';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import type { ProductGallerySettingsProps } from '@fincommerce/block-library/assets/js/blocks/product-gallery/types';

export const ProductGalleryBlockSettings = ( {
	attributes,
	setAttributes,
}: ProductGallerySettingsProps ) => {
	const { hoverZoom, fullScreenOnClick } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Media Settings', 'fincommerce' ) }>
				<ToggleControl
					label={ __( 'Zoom while hovering', 'fincommerce' ) }
					help={ __(
						'While hovering the large image will zoom in by 30%.',
						'fincommerce'
					) }
					checked={ hoverZoom }
					onChange={ () =>
						setAttributes( {
							hoverZoom: ! hoverZoom,
						} )
					}
				/>
				<ToggleControl
					label={ __( 'Open pop-up when clicked', 'fincommerce' ) }
					help={ __(
						'Clicking on the large image will open a full-screen gallery experience.',
						'fincommerce'
					) }
					checked={ fullScreenOnClick }
					onChange={ () =>
						setAttributes( {
							fullScreenOnClick: ! fullScreenOnClick,
						} )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
};
