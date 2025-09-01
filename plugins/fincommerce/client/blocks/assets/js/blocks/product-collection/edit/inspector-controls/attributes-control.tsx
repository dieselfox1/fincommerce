/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import ProductAttributeTermControl from '@fincommerce/editor-components/product-attribute-term-control';
import { SearchListItem } from '@fincommerce/editor-components/search-list-control/types';
import { ADMIN_URL } from '@fincommerce/settings';
import {
	ExternalLink,
	// @ts-expect-error Using experimental features
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { CoreFilterNames, QueryControlProps } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';
import { DEFAULT_FILTERS } from '@fincommerce/block-library/assets/js/blocks/product-collection/constants';

const EDIT_ATTRIBUTES_URL = `${ ADMIN_URL }edit.php?post_type=product&page=product_attributes`;

const AttributesControl = ( {
	query,
	trackInteraction,
	setQueryAttribute,
}: QueryControlProps ) => {
	const fincommerceAttributes = query.fincommerceAttributes || [];
	const selectedAttributes = fincommerceAttributes?.map(
		( { termId: id } ) => ( {
			id,
		} )
	);

	const deselectCallback = () => {
		setQueryAttribute( {
			fincommerceAttributes: DEFAULT_FILTERS.fincommerceAttributes,
		} );
		trackInteraction( CoreFilterNames.ATTRIBUTES );
	};

	return (
		<ToolsPanelItem
			label={ __( 'Product Attributes', 'fincommerce' ) }
			hasValue={ () => !! fincommerceAttributes?.length }
			onDeselect={ deselectCallback }
			resetAllFilter={ deselectCallback }
		>
			<ProductAttributeTermControl
				messages={ {
					search: __( 'Attributes', 'fincommerce' ),
				} }
				selected={ selectedAttributes || [] }
				onChange={ ( searchListItems: SearchListItem[] ) => {
					const newValue = searchListItems.map(
						( { id, value } ) => ( {
							termId: id as number,
							taxonomy: value as string,
						} )
					);

					setQueryAttribute( {
						fincommerceAttributes: newValue,
					} );
					trackInteraction( CoreFilterNames.ATTRIBUTES );
				} }
				operator={ 'any' }
				isCompact={ true }
				type={ 'token' }
			/>
			<ExternalLink
				className="wc-block-editor-product-collection-panel__manage-attributes-link"
				href={ EDIT_ATTRIBUTES_URL }
			>
				{ __( 'Manage attributes', 'fincommerce' ) }
			</ExternalLink>
		</ToolsPanelItem>
	);
};

export default AttributesControl;
