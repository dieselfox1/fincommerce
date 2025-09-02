/**
 * External dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@finpress/block-editor';
import { __ } from '@finpress/i18n';
import { PanelBody, ToggleControl } from '@finpress/components';

const ACCORDION_BLOCK_NAME = 'fincommerce/accordion-item';
const ACCORDION_BLOCK = {
	name: ACCORDION_BLOCK_NAME,
};

export default function Edit( { attributes: { autoclose }, setAttributes } ) {
	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: [ [ ACCORDION_BLOCK_NAME ], [ ACCORDION_BLOCK_NAME ] ],
		defaultBlock: ACCORDION_BLOCK,
		directInsert: true,
	} );

	return (
		<>
			<InspectorControls key="setting">
				<PanelBody
					title={ __( 'Settings', 'fincommerce' ) }
					initialOpen
				>
					<ToggleControl
						isBlock
						__nextHasNoMarginBottom
						label={ __( 'Auto-close', 'fincommerce' ) }
						onChange={ ( value ) => {
							setAttributes( {
								autoclose: value,
							} );
						} }
						checked={ autoclose }
						help={ __(
							'Automatically close accordions when a new one is opened.',
							'fincommerce'
						) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
}
