/**
 * External dependencies
 */
import { useEntityProp } from '@finpress/core-data';
import { __ } from '@finpress/i18n';
import { useCallback } from '@finpress/element';

/**
 * Internal dependencies
 */
import type {
	BindingSourceHandlerProps,
	BindingUseSourceProps,
	BlockProps,
} from '../../../bindings/types';
import type { fincommerceEntityProductSourceArgs } from './types';

/**
 * React custom hook to bind a source to a block.
 *
 * @param {BlockProps}                         blockProps - The block props.
 * @param {fincommerceEntityProductSourceArgs} sourceArgs - The source args.
 * @return {BindingUseSourceProps} The source value and setter.
 */
const useSource = (
	blockProps: BlockProps,
	sourceArgs: fincommerceEntityProductSourceArgs
): BindingUseSourceProps => {
	if ( typeof sourceArgs === 'undefined' ) {
		throw new Error( 'The "args" argument is required.' );
	}

	if ( ! sourceArgs?.prop ) {
		throw new Error( 'The "prop" argument is required.' );
	}

	const { prop, id } = sourceArgs;

	const [ value, updateValue ] = useEntityProp(
		'postType',
		'product',
		prop,
		id
	);

	const updateValueHandler = useCallback(
		( nextEntityPropValue: string ) => {
			updateValue( nextEntityPropValue );
		},
		[ updateValue ]
	);

	return {
		placeholder: null,
		value,
		updateValue: updateValueHandler,
	};
};

/*
 * Create the product-entity
 * block binding source handler.
 *
 * source ID: `fincommerce/entity-product`
 * args:
 * - prop: The name of the entity property to bind.
 *
 * In the example below,
 * the `content` attribute is bound to the `short_description` property.
 * `product` entity and `postType` kind are defined by the context.
 *
 * ```
 * metadata: {
 *   bindings: {
 *     content: {
 *       source: 'fincommerce/entity-product',
 *       args: {
 *         prop: 'short_description',
 *       },
 *    },
 * },
 * ```
 */
export default {
	name: 'fincommerce/entity-product',
	label: __( 'Product Entity', 'fincommerce' ),
	useSource,
	lockAttributesEditing: true,
} as BindingSourceHandlerProps< fincommerceEntityProductSourceArgs >;
