/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
export const useWooBlockProps = (attributes, props = {}) => {
    const additionalProps = {
        'data-template-block-id': attributes._templateBlockId,
        'data-template-block-order': attributes._templateBlockOrder,
        tabIndex: -1,
        ...props,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore the type definitions are slightly wrong. It should be possible to pass the tabIndex attribute.
    return useBlockProps(additionalProps);
};
