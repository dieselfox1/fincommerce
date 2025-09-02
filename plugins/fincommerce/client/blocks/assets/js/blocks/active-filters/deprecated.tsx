/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { blockAttributes } from '@fincommerce/block-library/assets/js/blocks/active-filters/attributes';
import metadata from '@fincommerce/block-library/assets/js/blocks/active-filters/block.json';
import { Attributes } from '@fincommerce/block-library/assets/js/blocks/active-filters/types';

const v1 = {
	attributes: {
		...metadata.attributes,
		...blockAttributes,
	},
	save: ( { attributes }: { attributes: Attributes } ) => {
		const { className, displayStyle, heading, headingLevel } = attributes;
		const data = {
			'data-display-style': displayStyle,
			'data-heading': heading,
			'data-heading-level': headingLevel,
		};

		return (
			<div
				{ ...useBlockProps.save( {
					className: clsx( 'is-loading', className ),
				} ) }
				{ ...data }
			>
				<span
					aria-hidden
					className="wc-block-active-filters__placeholder"
				/>
			</div>
		);
	},
};

const deprecated = [ v1 ];

export default deprecated;
