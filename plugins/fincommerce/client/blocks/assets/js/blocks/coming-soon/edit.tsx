/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	InnerBlocks,
} from '@finpress/block-editor';
import { PanelBody, ColorPicker } from '@finpress/components';
import { type BlockEditProps } from '@finpress/blocks';

export type Attributes = {
	color?: string;
	storeOnly?: boolean;
};

export type EditProps = BlockEditProps< Attributes >;

/**
 * Internal dependencies
 */

export default function Edit( { attributes, setAttributes }: EditProps ) {
	const { color, storeOnly } = attributes;
	const blockProps = { ...useBlockProps() };

	// Existance of storeOnly attribute means it doesn't have a background color,
	// absense of custom color attribute means it's post-v1 template,
	// in both cases, no need to show the color picker.
	if ( storeOnly || ! color ) {
		return (
			<div { ...blockProps }>
				<InnerBlocks />
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'fincommerce' ) }>
					<ColorPicker
						color={ color }
						// @ts-expect-error type is not defined in the library
						onChange={ ( newColor: string ) =>
							setAttributes( { color: newColor } )
						}
						enableAlpha
						defaultValue="#bea0f2"
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<InnerBlocks />
				<style>{ `:root{--fincommerce-coming-soon-color: ${ color } }` }</style>
			</div>
		</>
	);
}
