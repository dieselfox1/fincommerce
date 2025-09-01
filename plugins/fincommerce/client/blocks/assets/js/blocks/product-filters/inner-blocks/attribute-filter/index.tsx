/**
 * External dependencies
 */
import { productFilterAttribute } from '@fincommerce/icons';
import { getSetting } from '@fincommerce/settings';
import { AttributeSetting } from '@fincommerce/types';
import { registerBlockType } from '@wordpress/blocks';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/attribute-filter/block.json';
import Edit from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/attribute-filter/edit';
import Save from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/attribute-filter/save';

const ATTRIBUTES = getSetting< AttributeSetting[] >( 'attributes', [] );
const defaultAttribute = getSetting< AttributeSetting >(
	'defaultProductFilterAttribute'
);

registerBlockType( metadata, {
	edit: Edit,
	icon: productFilterAttribute,
	attributes: {
		...metadata.attributes,
		attributeId: {
			...metadata.attributes.attributeId,
			default: parseInt( defaultAttribute.attribute_id, 10 ),
		},
	},
	save: Save,
	variations: ATTRIBUTES.map( ( attribute, index ) => {
		return {
			name: `product-filter-attribute-${ attribute.attribute_name }`,
			title: sprintf(
				// translators: %s is the attribute label.
				__( '%s Filter', 'fincommerce' ),
				attribute.attribute_label
			),
			description: sprintf(
				// translators: %s is the attribute label.
				__(
					`Enable customers to filter the product collection by selecting one or more %s attributes.`,
					'fincommerce'
				),
				attribute.attribute_label
			),
			attributes: {
				attributeId: parseInt( attribute.attribute_id, 10 ),
			},
			isActive: [ 'attributeId' ],
			isDefault: index === 0,
		};
	} ),
} );
