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
export function SubsectionBlockEdit({ attributes, }) {
    const { description, title, blockGap } = attributes;
    const blockProps = useWooBlockProps(attributes);
    const innerBlockProps = useInnerBlocksProps({
        className: clsx('wp-block-fincommerce-product-section-header__content', `wp-block-fincommerce-product-section-header__content--block-gap-${blockGap}`),
    }, { templateLock: 'all' });
    const SubsectionTagName = title ? 'fieldset' : 'div';
    return (createElement(SubsectionTagName, { ...blockProps },
        title && (createElement(SectionHeader, { description: description, sectionTagName: SubsectionTagName, title: title })),
        createElement("div", { ...innerBlockProps })));
}
