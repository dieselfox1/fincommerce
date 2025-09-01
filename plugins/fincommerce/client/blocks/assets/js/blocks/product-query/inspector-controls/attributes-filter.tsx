/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import ProductAttributeTermControl from '@fincommerce/editor-components/product-attribute-term-control';
import {
	ExternalLink,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ProductQueryBlock } from '@fincommerce/block-library/assets/js/blocks/product-query/types';
import { setQueryAttribute } from '@fincommerce/block-library/assets/js/blocks/product-query/utils';
import { EDIT_ATTRIBUTES_URL } from '@fincommerce/block-library/assets/js/blocks/product-query/constants';

export const AttributesFilter = ( props: ProductQueryBlock ) => {
	const { query } = props.attributes;
	const [ selected, setSelected ] = useState< { id: number }[] >( [] );

	useEffect( () => {
		if ( query.__fincommerceAttributes ) {
			setSelected(
				query.__fincommerceAttributes.map( ( { termId: id } ) => ( {
					id,
				} ) )
			);
		}
	}, [ query.__fincommerceAttributes ] );

	return (
		<ToolsPanelItem
			label={ __( 'Product Attributes', 'fincommerce' ) }
			hasValue={ () => query.__fincommerceAttributes?.length }
		>
			<ProductAttributeTermControl
				messages={ {
					search: __( 'Attributes', 'fincommerce' ),
				} }
				selected={ selected }
				onChange={ ( attributes ) => {
					const __fincommerceAttributes = attributes.map(
						// eslint-disable-next-line @typescript-eslint/naming-convention
						( { id, value } ) => ( {
							termId: id,
							taxonomy: value,
						} )
					);

					setQueryAttribute( props, {
						__fincommerceAttributes,
					} );
				} }
				operator={ 'any' }
				isCompact={ true }
				type={ 'token' }
			/>
			<ExternalLink
				className="fincommerce-product-query-panel__external-link"
				href={ EDIT_ATTRIBUTES_URL }
			>
				{ __( 'Manage attributes', 'fincommerce' ) }
			</ExternalLink>
		</ToolsPanelItem>
	);
};
