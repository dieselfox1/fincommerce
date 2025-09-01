/**
 * External dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { createElement } from '@wordpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { RequirePassword } from '../../../components/require-password';
export function Edit({ attributes, }) {
    const blockProps = useWooBlockProps(attributes);
    const { label } = attributes;
    const [postPassword, setPostPassword] = useEntityProp('postType', 'product', 'post_password');
    return (createElement("div", { ...blockProps },
        createElement(RequirePassword, { label: label, postPassword: postPassword, onInputChange: setPostPassword })));
}
