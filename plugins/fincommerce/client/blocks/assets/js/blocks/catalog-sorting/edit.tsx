/**
 * External dependencies
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Disabled, PanelBody, ToggleControl } from '@wordpress/components';
import type { BlockEditProps } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import type { BlockAttributes } from '@fincommerce/block-library/assets/js/blocks/catalog-sorting/types';

const CatalogSorting = ( {
	useLabel,
}: Pick< BlockAttributes, 'useLabel' > ) => {
	return (
		<>
			{ useLabel ? (
				<>
					<label
						className="orderby-label"
						htmlFor="fincommerce-orderby"
					>
						{ __( 'Sort by', 'fincommerce' ) }
					</label>
					<select className="orderby" id="fincommerce-orderby">
						<option>{ __( 'Default', 'fincommerce' ) }</option>
					</select>
				</>
			) : (
				<select className="orderby">
					<option>{ __( 'Default sorting', 'fincommerce' ) }</option>
				</select>
			) }
		</>
	);
};

const Edit = ( {
	attributes,
	setAttributes,
}: BlockEditProps< BlockAttributes > ) => {
	const { useLabel } = attributes;
	const blockProps = useBlockProps( {
		className: 'fincommerce wc-block-catalog-sorting',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Accessibility', 'fincommerce' ) }>
					<ToggleControl
						label={ __( 'Show visual label', 'fincommerce' ) }
						help={ __(
							'Displays "Sort by" text before the dropdown menu to improve clarity and accessibility.',
							'fincommerce'
						) }
						checked={ useLabel }
						onChange={ ( isChecked ) =>
							setAttributes( {
								useLabel: isChecked,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<Disabled>
					<CatalogSorting useLabel={ useLabel } />
				</Disabled>
			</div>
		</>
	);
};

export default Edit;
