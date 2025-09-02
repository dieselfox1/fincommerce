/**
 * External dependencies
 */
import {
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
} from '@finpress/block-editor';
import { useEffect } from '@finpress/element';
import type { BlockAlignment } from '@finpress/blocks';
import { isExperimentalWcRestApiEnabled } from '@fincommerce/block-settings';
import { useProduct } from '@fincommerce/entities';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/price/block';
import { useIsDescendentOfSingleProductTemplate } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/shared/use-is-descendent-of-single-product-template';

type UnsupportedAligments = 'wide' | 'full';
type AllowedAlignments = Exclude< BlockAlignment, UnsupportedAligments >;

interface BlockAttributes {
	textAlign?: AllowedAlignments;
}

interface Attributes {
	textAlign: 'left' | 'center' | 'right';
	isDescendentOfSingleProduct: boolean;
	isDescendentOfSingleProductBlock: boolean;
	productId: number;
}

interface Context {
	queryId: number;
}

interface Props {
	attributes: Attributes;
	setAttributes: (
		attributes: Partial< BlockAttributes > & Record< string, unknown >
	) => void;
	context: Context;
}

const PriceEdit = ( {
	attributes,
	setAttributes,
	context,
}: Props ): JSX.Element => {
	const blockProps = useBlockProps();
	const blockAttrs = {
		...attributes,
		...context,
	};
	const isDescendentOfQueryLoop = Number.isFinite( context.queryId );

	let { isDescendentOfSingleProductTemplate } =
		useIsDescendentOfSingleProductTemplate();

	if ( isDescendentOfQueryLoop ) {
		isDescendentOfSingleProductTemplate = false;
	}

	useEffect(
		() =>
			setAttributes( {
				isDescendentOfQueryLoop,
				isDescendentOfSingleProductTemplate,
			} ),
		[
			isDescendentOfQueryLoop,
			isDescendentOfSingleProductTemplate,
			setAttributes,
		]
	);

	const { product } = useProduct( context.postId );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ attributes.textAlign }
					onChange={ ( textAlign: AllowedAlignments ) => {
						setAttributes( { textAlign } );
					} }
				/>
			</BlockControls>
			<div { ...blockProps }>
				<Block
					{ ...blockAttrs }
					isAdmin={ true }
					product={ product }
					isExperimentalWcRestApiEnabled={ isExperimentalWcRestApiEnabled() }
				/>
			</div>
		</>
	);
};

export default PriceEdit;
