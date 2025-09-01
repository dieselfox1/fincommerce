/**
 * External dependencies
 */
import clsx from 'clsx';
import { useStyleProps } from '@fincommerce/base-hooks';
import { isString } from '@fincommerce/types';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/stock-filter/block';
import { parseAttributes } from '@fincommerce/block-library/assets/js/blocks/stock-filter/utils';

const BlockWrapper = ( props: Record< string, unknown > ) => {
	const styleProps = useStyleProps( props );
	const parsedBlockAttributes = parseAttributes( props );

	return (
		<div
			className={ clsx(
				isString( props.className ) ? props.className : '',
				styleProps.className
			) }
			style={ styleProps.style }
		>
			<Block isEditor={ false } attributes={ parsedBlockAttributes } />
		</div>
	);
};

export default BlockWrapper;
