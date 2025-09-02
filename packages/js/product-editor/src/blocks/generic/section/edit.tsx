/**
 * External dependencies
 */
import clsx from 'clsx';
import { createElement } from '@finpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
import {
	// @ts-expect-error no exported member.
	useInnerBlocksProps,
} from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { SectionBlockAttributes } from './types';
import { ProductEditorBlockEditProps } from '../../../types';
import { SectionHeader } from '../../../components/section-header';

export function SectionBlockEdit( {
	attributes,
}: ProductEditorBlockEditProps< SectionBlockAttributes > ) {
	const { description, title, blockGap } = attributes;

	const blockProps = useWooBlockProps( attributes );
	const innerBlockProps = useInnerBlocksProps(
		{
			className: clsx(
				'wp-block-fincommerce-product-section-header__content',
				`wp-block-fincommerce-product-section-header__content--block-gap-${ blockGap }`
			),
		},
		{ templateLock: 'all' }
	);
	const SectionTagName = title ? 'fieldset' : 'div';

	return (
		<SectionTagName { ...blockProps }>
			{ title && (
				<SectionHeader
					description={ description }
					sectionTagName={ SectionTagName }
					title={ title }
				/>
			) }

			<div { ...innerBlockProps } />
		</SectionTagName>
	);
}
