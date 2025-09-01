/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanel as ToolsPanel,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { EditProps } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/status-filter/types';
import {
	DisplayStyleSwitcher,
	resetDisplayStyleBlock,
} from '@fincommerce/block-library/assets/js/blocks/product-filters/components/display-style-switcher';
import metadata from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/status-filter/block.json';

export const Inspector = ( {
	attributes,
	setAttributes,
	clientId,
}: EditProps ) => {
	const { displayStyle, showCounts, hideEmpty } = attributes;

	return (
		<InspectorControls>
			<ToolsPanel
				label={ __( 'Display Settings', 'fincommerce' ) }
				resetAll={ () => {
					setAttributes( {
						displayStyle: metadata.attributes.displayStyle.default,
						showCounts: metadata.attributes.showCounts.default,
						hideEmpty: metadata.attributes.hideEmpty.default,
					} );
					resetDisplayStyleBlock(
						clientId,
						metadata.attributes.displayStyle.default
					);
				} }
			>
				<ToolsPanelItem
					label={ __( 'Display Style', 'fincommerce' ) }
					hasValue={ () =>
						displayStyle !==
						'fincommerce/product-filter-checkbox-list'
					}
					isShownByDefault={ true }
					onDeselect={ () => {
						setAttributes( {
							displayStyle:
								metadata.attributes.displayStyle.default,
						} );
						resetDisplayStyleBlock(
							clientId,
							metadata.attributes.displayStyle.default
						);
					} }
				>
					<DisplayStyleSwitcher
						clientId={ clientId }
						currentStyle={ displayStyle }
						onChange={ ( value ) =>
							setAttributes( { displayStyle: value } )
						}
					/>
				</ToolsPanelItem>
				<ToolsPanelItem
					label={ __( 'Product counts', 'fincommerce' ) }
					hasValue={ () => showCounts }
					onDeselect={ () =>
						setAttributes( {
							showCounts: metadata.attributes.showCounts.default,
						} )
					}
					isShownByDefault={ true }
				>
					<ToggleControl
						label={ __( 'Product counts', 'fincommerce' ) }
						checked={ showCounts }
						onChange={ ( value: boolean ) =>
							setAttributes( { showCounts: value } )
						}
					/>
				</ToolsPanelItem>
				<ToolsPanelItem
					label={ __( 'Empty filter options', 'fincommerce' ) }
					hasValue={ () => ! hideEmpty }
					onDeselect={ () =>
						setAttributes( {
							hideEmpty: metadata.attributes.hideEmpty.default,
						} )
					}
				>
					<ToggleControl
						label={ __( 'Empty filter options', 'fincommerce' ) }
						checked={ ! hideEmpty }
						onChange={ ( value: boolean ) =>
							setAttributes( { hideEmpty: ! value } )
						}
					/>
				</ToolsPanelItem>
			</ToolsPanel>
		</InspectorControls>
	);
};
