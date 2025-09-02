/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { BlockAttributes } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/chips/types';
import { getColorClasses, getColorVars } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/chips/utils';

const Save = ( { attributes }: { attributes: BlockAttributes } ) => {
	const blockProps = useBlockProps.save( {
		className: clsx(
			'wc-block-product-filter-chips',
			attributes.className,
			getColorClasses( attributes )
		),
		style: {
			...getColorVars( attributes ),
		},
	} );

	return <div { ...blockProps } />;
};

export default Save;
