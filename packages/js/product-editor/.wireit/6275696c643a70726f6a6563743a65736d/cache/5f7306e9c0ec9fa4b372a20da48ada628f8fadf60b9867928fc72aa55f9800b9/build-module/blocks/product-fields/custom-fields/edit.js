/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
/**
 * Internal dependencies
 */
import { SectionActions } from '../../../components/block-slot-fill';
import { CustomFields } from '../../../components/custom-fields';
export function Edit({ attributes, }) {
    const blockProps = useWooBlockProps(attributes);
    return (createElement("div", { ...blockProps },
        createElement(CustomFields, { renderActionButtonsWrapper: (buttons) => (createElement(SectionActions, null, buttons)) })));
}
