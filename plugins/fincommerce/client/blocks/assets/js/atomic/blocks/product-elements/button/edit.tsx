/**
 * External dependencies
 */
import clsx from 'clsx';
import {
	Disabled,
	Button,
	ButtonGroup,
	PanelBody,
} from '@finpress/components';
import { __ } from '@finpress/i18n';
import {
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
	InspectorControls,
} from '@finpress/block-editor';
import type { BlockEditProps } from '@finpress/blocks';
import { useEffect } from '@finpress/element';
import { ProductQueryContext as Context } from '@fincommerce/blocks/product-query/types';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/button/block';
import { BlockAttributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/button/types';

function WidthPanel( {
	selectedWidth,
	setAttributes,
}: {
	selectedWidth: number | undefined;
	setAttributes: ( attributes: BlockAttributes ) => void;
} ) {
	function handleChange( newWidth: number ) {
		// Check if we are toggling the width off
		const width = selectedWidth === newWidth ? undefined : newWidth;

		// Update attributes.
		setAttributes( { width } );
	}

	return (
		<PanelBody title={ __( 'Width settings', 'fincommerce' ) }>
			<ButtonGroup aria-label={ __( 'Button width', 'fincommerce' ) }>
				{ [ 25, 50, 75, 100 ].map( ( widthValue ) => {
					return (
						<Button
							key={ widthValue }
							isSmall
							variant={
								widthValue === selectedWidth
									? 'primary'
									: undefined
							}
							onClick={ () => handleChange( widthValue ) }
						>
							{ widthValue }%
						</Button>
					);
				} ) }
			</ButtonGroup>
		</PanelBody>
	);
}

const Edit = ( {
	attributes,
	setAttributes,
	context,
}: BlockEditProps< BlockAttributes > & {
	context?: Context | undefined;
} ): JSX.Element => {
	const blockProps = useBlockProps();
	const isDescendentOfQueryLoop = Number.isFinite( context?.queryId );
	const { width } = attributes;

	useEffect(
		() => setAttributes( { isDescendentOfQueryLoop } ),
		[ setAttributes, isDescendentOfQueryLoop ]
	);
	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ attributes.textAlign }
					onChange={ ( newAlign ) => {
						setAttributes( { textAlign: newAlign || '' } );
					} }
				/>
			</BlockControls>
			<InspectorControls>
				<WidthPanel
					selectedWidth={ width }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>
			<div { ...blockProps }>
				<Disabled>
					<Block
						{ ...{ ...attributes, ...context } }
						blockClientId={ blockProps?.id }
						className={ clsx( attributes.className, {
							[ `has-custom-width wp-block-button__width-${ width }` ]:
								width,
						} ) }
					/>
				</Disabled>
			</div>
		</>
	);
};

export default Edit;
