import { useSelect } from '@wordpress/data';
import deprecated from '@wordpress/deprecated';
import { createElement } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { DisplayState } from '@fincommerce/components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { useEntityId } from '@wordpress/core-data';
export function Edit({ attributes, context, }) {
    deprecated('`fincommerce/conditional` block', {
        alternative: '`hideConditions` attribute on any block',
    });
    const { postType } = context;
    const blockProps = useWooBlockProps(attributes);
    const { mustMatch } = attributes;
    const productId = useEntityId('postType', postType);
    const displayBlocks = useSelect((select) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const product = select('core').getEditedEntityRecord('postType', postType, productId);
        for (const [prop, values] of Object.entries(mustMatch)) {
            if (!values.includes(product[prop])) {
                return false;
            }
        }
        return true;
    }, [postType, productId, mustMatch]);
    return (createElement(DisplayState, { ...blockProps, state: displayBlocks ? 'visible' : 'visually-hidden' },
        createElement(InnerBlocks, { templateLock: "all" })));
}
