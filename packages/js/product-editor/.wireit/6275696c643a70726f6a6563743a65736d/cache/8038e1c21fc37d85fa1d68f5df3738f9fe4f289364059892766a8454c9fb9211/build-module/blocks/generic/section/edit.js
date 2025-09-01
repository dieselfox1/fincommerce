/**
 * External dependencies
 */
import clsx from 'clsx';
import { createElement } from '@wordpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { 
// @ts-expect-error no exported member.
useInnerBlocksProps, } from '@wordpress/block-editor';
import { SectionHeader } from '../../../components/section-header';
export function SectionBlockEdit({ attributes, }) {
    const { description, title, blockGap } = attributes;
    const blockProps = useWooBlockProps(attributes);
    const innerBlockProps = useInnerBlocksProps({
        className: clsx('wp-block-fincommerce-product-section-header__content', `wp-block-fincommerce-product-section-header__content--block-gap-${blockGap}`),
    }, { templateLock: 'all' });
    const SectionTagName = title ? 'fieldset' : 'div';
    return (createElement(SectionTagName, { ...blockProps },
        title && (createElement(SectionHeader, { description: description, sectionTagName: SectionTagName, title: title })),
        createElement("div", { ...innerBlockProps })));
}
