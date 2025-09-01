/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { BlockAttributes } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/removable-chips/types';
import { getColorClasses, getColorVars } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/removable-chips/utils';

const Save = ( {
	attributes,
	style,
}: {
	attributes: BlockAttributes;
	style: Record< string, string >;
} ) => {
	const blockProps = useBlockProps.save( {
		className: clsx(
			'wc-block-product-filter-removable-chips',
			attributes.className,
			getColorClasses( attributes )
		),
		style: {
			...style,
			...getColorVars( attributes ),
		},
	} );

	return <div { ...blockProps } />;
};

export default Save;
