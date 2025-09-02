/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { CheckboxControl, PanelBody } from '@finpress/components';

/**
 * Internal dependencies
 */
import { QueryControlProps, RelatedBy, CoreFilterNames } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';

const RelatedByControl = ( {
	query,
	setQueryAttribute,
	trackInteraction,
}: QueryControlProps ) => {
	const relatedBy = query?.relatedBy as RelatedBy;

	const handleRelatedByChange = (
		value: boolean,
		type: 'categories' | 'tags'
	) => {
		const newRelatedBy = {
			...relatedBy,
			[ type ]: value,
		};

		setQueryAttribute( {
			relatedBy: newRelatedBy,
		} );

		trackInteraction( CoreFilterNames.RELATED_BY );
	};

	return (
		<PanelBody title={ __( 'Related by', 'fincommerce' ) }>
			<div className="wc-block-editor-product-collection-inspector-controls__relate-by">
				<CheckboxControl
					label={ __( 'Categories', 'fincommerce' ) }
					checked={ relatedBy?.categories }
					onChange={ ( value ) => {
						handleRelatedByChange( value, 'categories' );
					} }
				/>

				<CheckboxControl
					label={ __( 'Tags', 'fincommerce' ) }
					checked={ relatedBy?.tags }
					onChange={ ( value ) => {
						handleRelatedByChange( value, 'tags' );
					} }
				/>
			</div>
		</PanelBody>
	);
};

export default RelatedByControl;
