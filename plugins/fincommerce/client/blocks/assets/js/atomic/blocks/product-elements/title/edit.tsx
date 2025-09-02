/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Disabled, PanelBody, ToggleControl } from '@finpress/components';
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	useBlockProps,
} from '@finpress/block-editor';
import HeadingToolbar from '@fincommerce/editor-components/heading-toolbar';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/title/block';
import { Attributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/title/types';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/title/editor.scss';

interface Props {
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => void;
}

const TitleEdit = ( { attributes, setAttributes }: Props ): JSX.Element => {
	const blockProps = useBlockProps();
	const { headingLevel, showProductLink, align, linkTarget } = attributes;
	return (
		<div { ...blockProps }>
			<BlockControls>
				<HeadingToolbar
					isCollapsed={ true }
					minLevel={ 1 }
					maxLevel={ 7 }
					selectedLevel={ headingLevel }
					onChange={ ( newLevel: number ) =>
						setAttributes( { headingLevel: newLevel } )
					}
				/>
				<AlignmentToolbar
					value={ align }
					onChange={ ( newAlign ) => {
						setAttributes( { align: newAlign } );
					} }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Link settings', 'fincommerce' ) }>
					<ToggleControl
						label={ __( 'Make title a link', 'fincommerce' ) }
						checked={ showProductLink }
						onChange={ () =>
							setAttributes( {
								showProductLink: ! showProductLink,
							} )
						}
					/>
					{ showProductLink && (
						<>
							<ToggleControl
								label={ __( 'Open in new tab', 'fincommerce' ) }
								onChange={ ( value ) =>
									setAttributes( {
										linkTarget: value ? '_blank' : '_self',
									} )
								}
								checked={ linkTarget === '_blank' }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>
			<Disabled>
				<Block { ...attributes } />
			</Disabled>
		</div>
	);
};

export default TitleEdit;
