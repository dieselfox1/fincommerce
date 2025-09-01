/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

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
