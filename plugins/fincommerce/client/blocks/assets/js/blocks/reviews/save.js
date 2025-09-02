/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/reviews/editor.scss';
import { getBlockClassName, getDataAttrs } from '@fincommerce/block-library/assets/js/blocks/reviews/utils';

export default ( { attributes } ) => {
	return (
		<div
			{ ...useBlockProps.save( {
				className: getBlockClassName( attributes ),
			} ) }
			{ ...getDataAttrs( attributes ) }
		/>
	);
};
